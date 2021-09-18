using Persistence;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using Domain;
using System;
using Application.Activities;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] //activities/id
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            //Use object initialiser syntax in Query to define the Id-property of the Query.
            //Because Id is not a input argument of Query
            return await Mediator.Send(new Details.Query { Id = id });
            //return await _context.Activities.FindAsync(id);
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            //use object initiliazer syntaxt to pass the activity into the command
            return Ok(await Mediator.Send(new Create.Command { Activity = activity }));
        }
    }
}