using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RedAlign.Portal.Service;

namespace RedAlign.Portal.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlignmentSystemController : ControllerBase
    {
        private readonly PortalContext _context;

        public AlignmentSystemController(PortalContext context)
        {
            _context = context;
        }

        // GET: api/AlignmentSystem
        [HttpGet("{companyId}")]
        public async Task<ActionResult<IEnumerable<AlignmentSystem>>> GetAlignmentSystems(int companyId)
        {
            return await _context.AlignmentSystems.Where(a => a.CompanyId == companyId).ToListAsync();
        }

        // GET: api/AlignmentSystem/5
        [HttpGet("{companyId}/{id}")]
        public async Task<ActionResult<AlignmentSystem>> GetAlignmentSystem(int companyId, int id)
        {
            var alignmentSystem = await _context.AlignmentSystems.Where(a => a.CompanyId == companyId && a.AlignmentSystemId == id).FirstAsync();

            if (alignmentSystem == null)
            {
                return NotFound();
            }

            return alignmentSystem;
        }

        [HttpGet("{uniqueId}/equipment")]
        public async Task<ActionResult<List<FacilityEquipment>>> GetAvailableEquipment(string uniqueId)
        {
            AlignmentSystem alignmentSystem = await _context.AlignmentSystems.Where(a => a.UniqueId == uniqueId).FirstAsync();
            if(alignmentSystem != null)
            {
                List<FacilityEquipment> equipmentList = await _context.Equipment.Join
                            (
                                _context.Facilities.Where(f => f.CompanyId == alignmentSystem.CompanyId && !f.IsArchived),
                                equipment => equipment.FacilityId,
                                facility => facility.FacilityId,
                                (equipment, facility) => new FacilityEquipment()
                                {
                                    EquipmentId = equipment.EquipmentId,
                                    FacilityId = equipment.FacilityId,
                                    EquipmentType = equipment.EquipmentType,
                                    Name = equipment.Name,
                                    Motor = equipment.Motor,
                                    Facility = new Facility()
                                    {
                                        FacilityId = facility.FacilityId,
                                        Name = facility.Name
                                    }
                                }
                            )
                            .ToListAsync();

                return equipmentList;
            }
            else
            {
                return NotFound();
            }
        }

        // PUT: api/AlignmentSystem/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{companyId}/{id}")]
        public async Task<IActionResult> PutAlignmentSystem(int companyId, int id, [FromBody] AlignmentSystem alignmentSystem)
        {
            if ((id != alignmentSystem.AlignmentSystemId) && (companyId != alignmentSystem.CompanyId))
            {
                return BadRequest();
            }

            _context.Entry(alignmentSystem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AlignmentSystemExists(id))
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

        // POST: api/AlignmentSystem
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("{companyId}")]
        public async Task<ActionResult<AlignmentSystem>> PostAlignmentSystem(int companyId, [FromBody] AlignmentSystem alignmentSystem)
        {

            alignmentSystem.IsArchived = false;
            alignmentSystem.UpdateDate = DateTime.Now;

            _context.AlignmentSystems.Add(alignmentSystem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAlignmentSystem", new { id = alignmentSystem.AlignmentSystemId }, alignmentSystem);
        }

        // DELETE: api/AlignmentSystem/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlignmentSystem(int id)
        {
            var alignmentSystem = await _context.AlignmentSystems.FindAsync(id);
            if (alignmentSystem == null)
            {
                return NotFound();
            }

            _context.AlignmentSystems.Remove(alignmentSystem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AlignmentSystemExists(int id)
        {
            return _context.AlignmentSystems.Any(e => e.AlignmentSystemId == id);
        }
    }

    public class FacilityEquipment : Equipment
    {
        public new Facility Facility { get; set; }
    }
}
