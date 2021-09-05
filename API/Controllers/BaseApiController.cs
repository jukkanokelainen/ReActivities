using Microsoft.AspNetCore.Mvc;

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

    }
}