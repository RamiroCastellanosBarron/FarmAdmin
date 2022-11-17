using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public CustomersController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetPharmacies()
        {
            var pharmacies = await _unitOfWork.CustomersRepository.GetPharmacies();

            return Ok(pharmacies);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetPharmacies(int id)
        {
            var pharmacies = await _unitOfWork.CustomersRepository.GetPharmacy(id);

            return Ok(pharmacies);
        }

        [HttpGet("products")]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetProducts()
        {
            var products = await _unitOfWork.CustomersRepository.GetProducts();

            return Ok(products);
        }

        [HttpGet("products/{id}")]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetProducts(int id)
        {
            var product = await _unitOfWork.CustomersRepository.GetProduct(id);

            return Ok(product);
        }

        [HttpGet("purchases")]
        public async Task<ActionResult<IEnumerable<Sale>>> GetPurchases()
        {
            var purchases = await _unitOfWork.CustomersRepository.GetPurchases(User.GetUserId());

            return Ok(purchases);
        }

        [HttpGet("purchase/{id}")]
        public async Task<ActionResult<IEnumerable<Sale>>> GetPurchases(int id)
        {
            var purchase = await _unitOfWork.CustomersRepository.GetPurchase(id);

            return Ok(purchase);
        }
    }
}
