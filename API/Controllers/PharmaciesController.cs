using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PharmaciesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public PharmaciesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetCustomers()
        {
            var customers = await _unitOfWork.PharmaciesRepository.GetCustomers();

            return Ok(customers);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetCustomer(int id)
        {
            var customer = await _unitOfWork.PharmaciesRepository.GetCustomerPurchases(id, User.GetUserId());

            return Ok(customer);
        }

        [HttpGet("suppliers")]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetSuppliers()
        {
            var suppliers = await _unitOfWork.PharmaciesRepository.GetSuppliers(User.GetUsername());

            return Ok(suppliers);
        }

        [HttpGet("suppliers/{id}")]
        public async Task<ActionResult<AppUser>> GetSupplier(int id)
        {
            var supplier = await _unitOfWork.PharmaciesRepository.GetSupplier(id);

            return Ok(supplier);
        }

        [HttpGet("sales")]
        public async Task<ActionResult<IEnumerable<Sale>>> GetSales()
        {
            var sales = await _unitOfWork.PharmaciesRepository.GetSales(User.GetUsername());

            return Ok(sales);
        }

        [HttpGet("sales/{id}")]
        public async Task<ActionResult<Sale>> GetSale(int id)
        {
            var sale = await _unitOfWork.PharmaciesRepository.GetSale(id);

            return Ok(sale);
        }

        [HttpGet("purchases")]
        public async Task<ActionResult<IEnumerable<Sale>>> GetPurchases()
        {
            var purchases = await _unitOfWork.PharmaciesRepository.GetPurchases(User.GetUserId());

            return Ok(purchases);
        }

        [HttpGet("purchases/{id}")]
        public async Task<ActionResult<Sale>> GetPurchase(int id)
        {
            var purchase = await _unitOfWork.PharmaciesRepository.GetPurchase(id);

            return Ok(purchase);
        }

        [HttpGet("products")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var products = await _unitOfWork.PharmaciesRepository.GetProducts(User.GetUsername());

            return Ok(products);
        }

        [HttpGet("products/{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _unitOfWork.PharmaciesRepository.GetProduct(id);

            return Ok(product);
        }

        [HttpGet("items")]
        public async Task<ActionResult<IEnumerable<Product>>> GetItems()
        {
            var products = await _unitOfWork.PharmaciesRepository.GetItems();

            return Ok(products);
        }

        [HttpGet("items/{id}")]
        public async Task<ActionResult<Product>> GetItem(int id)
        {
            var product = await _unitOfWork.PharmaciesRepository.GetItem(id);

            return Ok(product);
        }

        [HttpGet("user")]
        public async Task<ActionResult<AppUser>> GetUser()
        {
            var user = await _unitOfWork.PharmaciesRepository.GetUser(User.GetUserId());

            return Ok(user);
        }

        [HttpPost("buy")]
        public async Task<ActionResult<string>> BuyProduct(Product product)
        {
            var response = await _unitOfWork.PharmaciesRepository.BuyProduct(product, User.GetUserId());

            if (response == false) return BadRequest();

            return Ok();
        }
    }
}
