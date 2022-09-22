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
    public class Result
    {
        public int AlignmentResultId { get; set; }
        public string MeasurementId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Name { get; set; }
        public string Model { get; set; }
        public string SerialNumber { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class AlignmentContoller : ControllerBase
    {
        private readonly PortalContext _context;

        public AlignmentContoller(PortalContext context)
        {
            _context = context;
        }



        // GET: api/AlignmentContoller
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Result>>> GetAlignmentResult()
        {
            var results = await _context.AlignmentResults
                .Join(
                    _context.AlignmentSystems,
                    result => result.AlignmentSystemId,
                    system => system.AlignmentSystemId,
                    (result, system) => new Result()
                    {
                        AlignmentResultId = result.AlignmentResultId,
                        MeasurementId = result.MeasurementId,
                        StartTime = result.StartTime,
                        EndTime = result.EndTime,
                        Name = system.Name,
                        Model = system.Make,
                        SerialNumber = system.SerialNumber
                    }
                )
                .OrderByDescending(r => r.StartTime)
                .ToListAsync();

            return results;

            //return await _context.AlignmentResults.ToListAsync();
        }

        // GET: api/AlignmentContoller/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AlignmentResult>> GetAlignmentResult(int id)
        {
            var alignmentResult = await _context.AlignmentResults.FindAsync(id);

            if (alignmentResult == null)
            {
                return NotFound();
            }

            return alignmentResult;
        }

        // PUT: api/AlignmentContoller/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAlignmentResult(int id, AlignmentResult alignmentResult)
        {
            if (id != alignmentResult.AlignmentResultId)
            {
                return BadRequest();
            }

            _context.Entry(alignmentResult).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AlignmentResultExists(id))
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

        // POST: api/AlignmentContoller
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AlignmentResult>> PostAlignmentResult(AlignmentResult alignmentResult)
        {
            _context.AlignmentResults.Add(alignmentResult);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAlignmentResult", new { id = alignmentResult.AlignmentResultId }, alignmentResult);
        }

        // DELETE: api/AlignmentContoller/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlignmentResult(int id)
        {
            var alignmentResult = await _context.AlignmentResults.FindAsync(id);
            if (alignmentResult == null)
            {
                return NotFound();
            }

            _context.AlignmentResults.Remove(alignmentResult);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AlignmentResultExists(int id)
        {
            return _context.AlignmentResults.Any(e => e.AlignmentResultId == id);
        }
    }
}
