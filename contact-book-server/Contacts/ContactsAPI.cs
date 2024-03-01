using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Contacts.Models;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Azure.Cosmos;

namespace Contacts
{
    public  class ContactsAPI
    {
        private readonly CosmosClient _cosmosClient;
        private Container _documentContainer;

        public ContactsAPI(CosmosClient cosmosClient)
        {
            _cosmosClient = cosmosClient;
            _documentContainer = _cosmosClient.GetContainer("contacts", "contacts");
        }

        [FunctionName("GetContacts")]
        public async Task<IActionResult> GetContacts(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "contact")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Getting contacts...");

            List<Contact> contactList = new List<Contact>();

            var contacts = _documentContainer.GetItemQueryIterator<Contact>();
            while (contacts.HasMoreResults)
            {
                var response = await contacts.ReadNextAsync();
                contactList.AddRange(response.ToList());
            }

            return new OkObjectResult(contactList);
        }

        [FunctionName("CreateContact")]
        public async Task<IActionResult> CreateContact(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "contact")]
            HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Creating contact...");

            string requestData = await new StreamReader(req.Body).ReadToEndAsync();
            var data = JsonConvert.DeserializeObject<Contact>(requestData);

            Contact contact = new Contact
            {
                Id = data.Id,
                Name = data.Name,
                Email = data.Email,
                Phone = data.Phone,
                Company = data.Company,
                Comment = data.Comment
            };

            await _documentContainer.CreateItemAsync(contact);

            return new OkObjectResult(contact);
        }

        [FunctionName("UpdateContact")]
        public async Task<IActionResult> UpdateContact(
            [HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "contact/{id}")] HttpRequest req,
            ILogger log, string id)
        {
            log.LogInformation($"Updating contact with id: {id}...");

            string requestData = await new StreamReader(req.Body).ReadToEndAsync();
            var data = JsonConvert.DeserializeObject<Contact>(requestData);

            try
            {
                var contact = await _documentContainer.ReadItemAsync<Contact>(id, new PartitionKey(id));

                contact.Resource.Name = data.Name;
                contact.Resource.Email = data.Email;
                contact.Resource.Phone = data.Phone;
                contact.Resource.Company = data.Company;
                contact.Resource.Comment = data.Comment;

                await _documentContainer.UpsertItemAsync(contact.Resource);

                return new OkObjectResult(contact.Resource);
            }
            catch (CosmosException e) when (e.StatusCode == System.Net.HttpStatusCode.NotFound) 
            {
                return new NotFoundResult();
            }
        }

        [FunctionName("DeleteContact")]
        public async Task<IActionResult> DeleteContact(
            [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "contact/{id}")] HttpRequest req,
            ILogger log, string id)
        {
            log.LogInformation($"Deleting contact with id: {id}...");

            try
            {
            await _documentContainer.DeleteItemAsync<Contact>(id, new PartitionKey(id));

            return new OkResult();

            }
            catch (CosmosException e) when (e.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return new NotFoundResult();
            }
        }
    }
}
