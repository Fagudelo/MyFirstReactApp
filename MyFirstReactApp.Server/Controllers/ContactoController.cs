using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyFirstReactApp.Server.Models;

namespace MyFirstReactApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactoController(MyFirstReactAppDbContext dbContext) : ControllerBase
    {
        private readonly MyFirstReactAppDbContext _dbContext = dbContext;

        [HttpGet]
        [Route ("List")]
        public async Task<IActionResult>List()
        {
            List<Contacto> list = await _dbContext.Contactos.OrderByDescending(c => c.IdContacto).ToListAsync();

            return StatusCode(StatusCodes.Status200OK, list);
        }

        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> Add([FromBody] Contacto contacto)
        {
            await _dbContext.Contactos.AddAsync(contacto);
            await _dbContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "Ok");
        }

        [HttpPut]
        [Route("Update")]
        public async Task<IActionResult> Update([FromBody] Contacto contacto)
        {
            _dbContext.Contactos.Update(contacto);
            await _dbContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "Ok");
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            Contacto contacto = _dbContext.Contactos.Find(id);

            _dbContext.Contactos.Remove(contacto);
            await _dbContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "Ok");
        }
    }
}
