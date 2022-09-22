using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using RedAlign.Data;

namespace RedAlign.Portal.Service
{
    public interface IMongo
    {
        public IEnumerable<Measurements> GetMeasurements();
        public void Save(Measurements result);
    }

    /// <summary>
    /// Saves raw measuring results to the MongoDB instance
    /// </summary>
    public class Mongo : IMongo
    {
        private string _dbName = "Results";
        private string _collectionName = "Measurements";
        private IConfiguration Configuration { get; }

        public Mongo(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IEnumerable<Measurements> GetMeasurements()
        {
            IMongoClient client = GetClient();
            IMongoCollection<Measurements> collection;
            List<Measurements> measurements = new List<Measurements>();

            if(client != null)
            {
                collection = client.GetDatabase(_dbName).GetCollection<Measurements>(_collectionName);

                var projections = Builders<Measurements>.Projection.Include("start").Include("end").Include("routine");

                measurements = collection.Find(Builders<Measurements>.Filter.Empty)
                    .Project<Measurements>(projections)
                    .ToList();
            }

            return measurements;
        }

        public void Save(Measurements result)
        {
            try
            {
                IMongoClient client = GetClient();
                IMongoCollection<Measurements> collection;

                if(client != null)
                {
                    // Provide the name of the database and collection you want to use.
                    // If they don't already exist, the driver and Atlas will create them
                    // automatically when you first write data.
                    collection = client.GetDatabase(_dbName).GetCollection<Measurements>(_collectionName);
                    collection.InsertOne(result);
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine("A problem occurred inserting a record into MongoDB");
                Console.WriteLine(ex);
            }
        }

        private IMongoClient GetClient()
        {
            IMongoClient client = null;

            try
            {
                client = new MongoClient(Configuration.GetConnectionString("Mongo"));
            }
            catch(Exception ex)
            {
                Console.WriteLine("A problem occurred creating a connection the MongoDB");
                Console.WriteLine(ex);
            }

            return client;
        }
    }
}
