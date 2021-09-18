using Persistence;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using Domain;
using Microsoft.EntityFrameworkCore;
using System;
using Application;
using MediatR;
using Application.Activities;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly IMediator _mediator;

        public ActivitiesController(IMediator mediator)
        {
            this._mediator = mediator;
        }


        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] //activities/id
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return Ok();
            //return await _context.Activities.FindAsync(id);
        }
    }
}