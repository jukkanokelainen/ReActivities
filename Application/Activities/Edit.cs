using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        //Command does not return anything whereas Query does
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this._context = context;
                this._mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id);

                //We could update each property one by on one.
                //activity.Title = request.Activity.Title ?? activity.Title;
                //instead we use handler

                _mapper.Map(request.Activity, activity);

                await _context.SaveChangesAsync();
                //This is where the data is actually stored indatabase.
                //await _context.SaveChangesAsync();

                //this returns nothing but is a way to tel our API controller that we are finished.
                return Unit.Value;
            }
        }
    }
}
