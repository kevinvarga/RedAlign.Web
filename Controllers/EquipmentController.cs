using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace RedAlign.Portal.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquipmentController : ControllerBase
    {
        private readonly PortalContext _context;

        public EquipmentController(PortalContext context)
        {
            _context = context;
        }

        // GET: api/Equipment
        [HttpGet("{facilityId}")]
        public async Task<ActionResult<IEnumerable<Equipment>>> GetEquipment(int facilityId)
        {
            return await _context.Equipment.Where(e => e.FacilityId == facilityId).ToListAsync();
        }

        // GET: api/Equipment/{facilityId}/{equipmentId}
        [HttpGet("{facilityId}/{id}")]
        public async Task<ActionResult<Equipment>> GetEquipment(int facilityId, int id)
        {
            var equipment = await _context.Equipment.Where(e => e.FacilityId == facilityId && e.EquipmentId == id).FirstAsync();

            if (equipment == null)
            {
                return NotFound();
            }

            return equipment;
        }

        // PUT: api/Equipment/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{facilityId}/{equipmentId}")]
        public async Task<IActionResult> PutEquipment(int facilityId, int equipmentId, Equipment equipment)
        {
            if (equipmentId != equipment.EquipmentId && facilityId == equipment.FacilityId) 
            {
                return BadRequest();
            }

            _context.Entry(equipment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EquipmentExists(equipmentId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Equipment
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("{facilityId}")]
        public async Task<ActionResult<Equipment>> PostEquipment(int facilityId, Equipment equipment)
        {
            equipment.FacilityId = facilityId;
            equipment.IsArchived = false;
            equipment.UpdateDate = DateTime.Now;

            _context.Equipment.Add(equipment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEquipment", new { id = equipment.EquipmentId }, equipment);
        }

        // DELETE: api/Equipment/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEquipment(int id)
        {
            var equipment = await _context.Equipment.FindAsync(id);
            if (equipment == null)
            {
                return NotFound();
            }

            _context.Equipment.Remove(equipment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EquipmentExists(int id)
        {
            return _context.Equipment.Any(e => e.EquipmentId == id);
        }
    }
}
