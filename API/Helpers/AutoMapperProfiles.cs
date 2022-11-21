using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, SupplierDto>();

            CreateMap<Product, ProductDto>();

            CreateMap<InventorySupplier, InventorySupplierDto>();

            CreateMap<Sale, SaleDto>();

            CreateMap<AppUser, SellerDto>();

            CreateMap<AppUser, BuyerDto>();

            CreateMap<AppUser, PharmacyDto>();

            CreateMap<InventoryPharmacy, InventoryPharmacyDto>();
        }
    }
}
