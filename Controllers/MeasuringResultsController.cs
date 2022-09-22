using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Json.Net;
using RedAlign.Data;

namespace RedAlign.Portal.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]    
    public class MeasuringResultController : ControllerBase
    {
        private readonly PortalContext _context;
        private IMongo Mongo { get; set; }

        // add DB context for saving results

        public MeasuringResultController(PortalContext portalContext, IMongo mongo)
        {
            _context = portalContext;
            Mongo = mongo;
        }

        [HttpGet]
        [Authorize]
        public IEnumerable<Measurements> Get()
        {
            return Mongo.GetMeasurements();
        }

        [HttpPost]
        public void Save([FromBody] Measurements measurements)
        {
            measurements.AssignObjectId();
            AlignmentSystem alignment = _context.AlignmentSystems.Where(a => a.UniqueId == measurements.hardware.id).First();
            Equipment equipment = _context.Equipment.Where(e => e.EquipmentId == measurements.equipment.id).First(); 

            _context.AlignmentResults.Add(new AlignmentResult()
            {
                AlignmentSystemId = alignment.AlignmentSystemId,
                EquipmentId = equipment.EquipmentId,
                MeasurementId = measurements._id.ToString(),
                StartTime = measurements.start,
                EndTime = measurements.end,
                InsertDate = DateTime.Now
            });
            _context.SaveChangesAsync();
            
            Mongo.Save(measurements);
        }
    }
}