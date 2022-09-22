using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Identity.Web.Resource;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RedAlign.Portal.Service.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        public IConfiguration Configuration { get; }
        public UserController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // GET: api/values
        [HttpGet]
        [Authorize("read:users")]
        public async Task<IEnumerable<Auth0User>> Get()
        {
            List<Auth0User> users = new List<Auth0User>();

            try
            {
                Auth0Token token = await GetToken();
                HttpClient auth0 = new HttpClient();

                auth0.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token.access_token);
                HttpResponseMessage resp = await auth0.GetAsync("https://redalign.us.auth0.com/api/v2/users");

                if (resp.IsSuccessStatusCode)
                {
                    users = JsonSerializer.Deserialize<List<Auth0User>>(await resp.Content.ReadAsStringAsync());
                    //string users = await resp.Content.ReadAsStringAsync();
                    Console.WriteLine(users);
                    Console.WriteLine("users received");
                }
                else
                {
                    Console.WriteLine($"failed: {await resp.Content.ReadAsStringAsync()}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                //_logger.LogError(ex, "An unexpected error occurred publishing results.");
            }

            return users; // new string[] { "value1", "value2" };
        }

        private async Task<Auth0Token> GetToken()
        {
            Auth0Token auth0Token = null;
            HttpClient auth0 = new HttpClient();

            Auth0TokenRequest request = new Auth0TokenRequest()
            {
                client_id = Configuration["Auth0ManagementAPI:ClientId"],
                client_secret = Configuration["Auth0ManagementAPI:ClientSecret"],
                audience = Configuration["Auth0ManagementAPI:Audience"],
                grant_type = Auth0TokenRequest.CLIENT_CREDENTIALS
            };

            HttpResponseMessage resp = await auth0.PostAsync("https://redalign.us.auth0.com/oauth/token", new StringContent(JsonSerializer.Serialize(request), System.Text.Encoding.UTF8, "application/json"));
            if (resp.IsSuccessStatusCode)
            {
                auth0Token = JsonSerializer.Deserialize<Auth0Token>(await resp.Content.ReadAsStringAsync());
            }

            return auth0Token;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }

    public class Auth0TokenRequest
    {
        public const string CLIENT_CREDENTIALS = "client_credentials";

        public string client_id { get; set; }
        public string client_secret { get; set; }
        public string audience { get; set; }
        public string grant_type { get; set; }
    }

    public class Auth0Token
    {
        public string access_token { get; set; }
        public string token_type { get; set; }
        public int expires_in { get; set; }
    }

    public class Auth0User
    {
        public string user_id { get; set; }
        public string email { get; set; }
    }
}
