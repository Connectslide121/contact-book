using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace ContactFunctions
{
    public class ContactFunctions
    {
        private readonly ILogger<ContactFunctions> _logger;

        public ContactFunctions(ILogger<ContactFunctions> logger)
        {
            _logger = logger;
        }

        [Function("ContactFunctions")]
        public IActionResult Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = "contact")] HttpRequest req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");
            return new OkObjectResult("Welcome to Azure Functions!");
        }
    }
}
