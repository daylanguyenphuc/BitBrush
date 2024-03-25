using BitBrushAPI.Data;
using BitBrushAPI.Model;
using Microsoft.EntityFrameworkCore;
using static BitBrushAPI.Service.ProductRepo;

namespace BitBrushAPI.Service
{
    public interface IProductRepo
    {
        public List<ProductFullDTO> GetAllProducts();
        public ProductFullDTO GetProductById(Guid id);
        public ProductFullDTO AddProduct(ProductAddDTO newProduct);
        public void UpdateProduct (Guid id, ProductAddDTO updateProduct);
        public void DeleteProduct (Guid id);
        public void AddTagToProduct(ProductTagAddDTO newProductTag);
        public void DeleteTagFromProduct(Guid deleteProductId, Guid deleteTagId);
        public ProductFullDTO ResellOwnedProduct(Guid id, ProductResellDTO resellProduct);

    }
    public class ProductRepo : IProductRepo
    {
        private readonly MyDBContext _dbContext;

        public ProductRepo(MyDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<ProductFullDTO> GetAllProducts()
        {
            var products = _dbContext.Products
                                    .Include(p => p.collection)
                                    .Include(p => p.creator)
                                    .Include(p => p.owner)
                                    .Include(p => p.tags)
                                    .Select(p => new ProductFullDTO
                                    {
                                        id = p.id,
                                        name = p.name,
                                        description = p.description,
                                        tags = p.tags.Select(pt => new ProductTagCompactDTOforProduct
                                        {
                                            tag = new TagCompactDTO
                                            {
                                                id = pt.tag.id,
                                                name = pt.tag.name,
                                            }
                                        }).ToList(),
                                        collection = new CollectionCompactDTO
                                        {
                                            id = p.collection.id,
                                            name = p.collection.name
                                        },
                                        thumbnailUrl = p.thumbnailUrl,
                                        owner = new UserCompactDTO
                                        {
                                            id = p.owner.id,
                                            firstName = p.owner.firstName,
                                            lastName = p.owner.lastName,
                                        },
                                        creator = new UserCompactDTO
                                        {
                                            id = p.creator.id,
                                            firstName = p.creator.firstName,
                                            lastName = p.creator.lastName,
                                        },
                                        createdDate = p.createdDate,
                                        sellingStatus = p.sellingStatus,
                                        price = p.price
                                    }).ToList();
            return products;
        }

        public ProductFullDTO GetProductById(Guid id)
        {
            var product = _dbContext.Products
                                    .Include(p => p.collection)
                                    .Include(p => p.creator)
                                    .Include(p => p.owner)
                                    .Where(p => p.id == id)
                                    .Select(p => new ProductFullDTO
                                    {
                                        id = p.id,
                                        name = p.name,
                                        description = p.description,
                                        collection = new CollectionCompactDTO
                                        {
                                            id = p.collection.id,
                                            name = p.collection.name
                                        },
                                        thumbnailUrl = p.thumbnailUrl,
                                        owner = new UserCompactDTO
                                        {
                                            id = p.owner.id,
                                            firstName = p.owner.firstName,
                                            lastName = p.owner.lastName,
                                        },
                                        creator = new UserCompactDTO
                                        {
                                            id = p.creator.id,
                                            firstName = p.creator.firstName,
                                            lastName = p.creator.lastName,
                                        },
                                        createdDate = p.createdDate,
                                        sellingStatus = p.sellingStatus,
                                        price = p.price
                                    }).FirstOrDefault();
            return product;
        }

        public ProductFullDTO AddProduct(ProductAddDTO newProduct)
        {
            var product = new Product
            {
                name = newProduct.name,
                description = newProduct.description,
                collectionId = newProduct.collectionId,
                thumbnailUrl = newProduct.thumbnailUrl,
                ownerId = newProduct.ownerId,
                creatorId = newProduct.creatorId,
                createdDate = DateTime.UtcNow,
                sellingStatus = newProduct.sellingStatus,
                price = newProduct.price
            };

            _dbContext.Products.Add(product);
            _dbContext.SaveChanges();

            return new ProductFullDTO
            {
                id = product.id,
                name = product.name,
                description = product.description,
                collection = new CollectionCompactDTO
                {
                    id = product.collectionId,
                    name = _dbContext.Collections.SingleOrDefault(c => c.id == product.collectionId).name
                },
                thumbnailUrl = product.thumbnailUrl,
                owner = new UserCompactDTO
                {
                    id = product.ownerId,
                    firstName = _dbContext.Users.SingleOrDefault(u => u.id == product.ownerId).firstName,
                    lastName = _dbContext.Users.SingleOrDefault(u => u.id == product.ownerId).lastName,
                },
                creator = new UserCompactDTO
                {
                    id = product.creatorId,
                    firstName = _dbContext.Users.SingleOrDefault(u => u.id == product.creatorId).firstName,
                    lastName = _dbContext.Users.SingleOrDefault(u => u.id == product.creatorId).lastName,
                },
                createdDate = product.createdDate,
                sellingStatus = product.sellingStatus,
                price = product.price
            };
        }

        public void UpdateProduct (Guid id, ProductAddDTO updateProduct)
        {
            var product = _dbContext.Products.SingleOrDefault(d => d.id == id);
            product.name = updateProduct.name;
            product.description = updateProduct.description;
            product.collectionId = updateProduct.collectionId;
            product.sellingStatus = updateProduct.sellingStatus;
            product.price = updateProduct.price;
            _dbContext.Update(product);
            _dbContext.SaveChanges();
        }

        public void DeleteProduct(Guid id)
        {
            var product = _dbContext.Products.SingleOrDefault(p => p.id == id);
            if (product != null)
            {
                _dbContext.Remove(product);
                _dbContext.SaveChanges();
            }
        }

        public void AddTagToProduct (ProductTagAddDTO newProductTag)
        {
            var productTag = new ProductTag
            {
                productId = newProductTag.productId,
                tagId = newProductTag.tagId,
            };

            _dbContext.ProductTags.Add(productTag);
            _dbContext.SaveChanges();
        }

        public void DeleteTagFromProduct(Guid deleteProductId, Guid deleteTagId)
        {
            var productTag = _dbContext.ProductTags.SingleOrDefault(pt => pt.productId == deleteProductId && pt.tagId == deleteTagId);
            if (productTag != null)
            {
                _dbContext.Remove(productTag);
                _dbContext.SaveChanges();
            }
        }

        public ProductFullDTO ResellOwnedProduct(Guid id, ProductResellDTO resellProduct)
        {
            var product = _dbContext.Products.SingleOrDefault(d => d.id == id);
            product.sellingStatus = true;
            product.price = resellProduct.price;
            _dbContext.Update(product);
            _dbContext.SaveChanges();
            return new ProductFullDTO
            {
                id = product.id,
                name = product.name,
                description = product.description,
                collection = new CollectionCompactDTO
                {
                    id = product.collectionId,
                    name = _dbContext.Collections.SingleOrDefault(c => c.id == product.collectionId).name
                },
                thumbnailUrl = product.thumbnailUrl,
                owner = new UserCompactDTO
                {
                    id = product.ownerId,
                    firstName = _dbContext.Users.SingleOrDefault(u => u.id == product.ownerId).firstName,
                    lastName = _dbContext.Users.SingleOrDefault(u => u.id == product.ownerId).lastName,
                },
                creator = new UserCompactDTO
                {
                    id = product.creatorId,
                    firstName = _dbContext.Users.SingleOrDefault(u => u.id == product.creatorId).firstName,
                    lastName = _dbContext.Users.SingleOrDefault(u => u.id == product.creatorId).lastName,
                },
                createdDate = product.createdDate,
                sellingStatus = product.sellingStatus,
                price = product.price
            };
        }
    }
}
