using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

//BaseApiController is the base that all other controllers are derived from
//all have same ApiController-attribute and Route that have "controller" as placeholder
namespace API.Controllers
{
    [ApiController]
    //Note that [controller] is a placeholder that is replaced with a class name
    //i.e. ActivitiesController endpoinst are found in url/api/activities
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        private IMediator _mediator;

        //If _mediator is null get it from services
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices
        .GetService<IMediator>();

    }
}