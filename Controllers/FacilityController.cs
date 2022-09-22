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
    public class FacilityController : ControllerBase
    {
        private readonly PortalContext _context;

        public FacilityController(PortalContext context)
        {
            _context = context;
        }

        // GET: api/Facility
        [HttpGet("{companyid}")]
        public async Task<ActionResult<IEnumerable<Facility>>> GetFacilities(int companyId)
        {
            return await _context.Facilities.Where(f => f.CompanyId == companyId).ToListAsync();
        }

        // GET: api/Facility/5
        [HttpGet("{companyId}/{id}")]
        public async Task<ActionResult<Facility>> GetFacility(int companyId, int id)
        {
            var facility = await _context.Facilities.Where(f => f.CompanyId == companyId && f.FacilityId == id).FirstAsync(); ;

            if (facility == null)
            {
                return NotFound();
            }

            return facility;
        }

        // PUT: api/Facility/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{companyId}/{id}")]
        public async Task<IActionResult> PutFacility(int companyId, int id, Facility facility)
        {
            if (id != facility.FacilityId && companyId != facility.CompanyId)
            {
                return BadRequest();
            }

            _context.Entry(facility).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FacilityExists(id))
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

        // POST: api/Facility
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("{companyId}")]
        public async Task<ActionResult<Facility>> PostFacility(int companyId, [FromBody] Facility facility)
        {
            if(companyId == facility.CompanyId)
            {
                facility.CompanyId = companyId;
                facility.UpdateDate = DateTime.Now;
                _context.Facilities.Add(facility);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetFacility", new {companyId = facility.CompanyId, id = facility.FacilityId }, facility);
            }

            return BadRequest();
        }

        // DELETE: api/Facility/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFacility(int id)
        {
            var facility = await _context.Facilities.FindAsync(id);
            if (facility == null)
            {
                return NotFound();
            }

            _context.Facilities.Remove(facility);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FacilityExists(int id)
        {
            return _context.Facilities.Any(e => e.FacilityId == id);
        }
    }
}
