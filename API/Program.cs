using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace API
{
    public class Program
    {
        public async static Task Main(string[] args)
        {
            //Create the host
            //Host is run after the need for migrations is checkked and run.
            var host = CreateHostBuilder(args).Build();
            using var scope = host.Services.CreateScope();

            var services = scope.ServiceProvider;

            try
            {
                //Get the context from the list of services
                var context = services.GetRequiredService<DataContext>();
                //Run the migrations i.e. create database if not exist or update it to the latest migration
                await context.Database.MigrateAsync();
                //Insert seed data
                await Seed.SeedData(context);
            }
            catch (Exception ex)
            {
                //Get the logger from the list of services
                var logger = services.GetRequiredService<ILogger<Program>>();
                //Log the error
                logger.LogError(ex, "An error occured during migration");
            }

            //after migrations are done, start the service:
            await host.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
