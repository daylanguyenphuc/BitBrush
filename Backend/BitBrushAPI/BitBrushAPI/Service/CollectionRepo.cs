using BitBrushAPI.Data;
using BitBrushAPI.Model;
using Microsoft.EntityFrameworkCore;
using System.Runtime.Intrinsics.Arm;

namespace BitBrushAPI.Service
{
    public interface ICollectionRepo
    {
        List<CollectionFullDTO> GetAllCollections();
        public CollectionFullDTO GetCollectionById (Guid id);
        public CollectionFullDTO AddCollection(CollectionAddDTO newCollection);
        public void UpdateCollection(Guid id, CollectionAddDTO updateCollection);
        public void DeleteCollection(Guid id);
    }

    public class CollectionRepo : ICollectionRepo
    {
        private readonly MyDBContext _dbContext;

        public CollectionRepo(MyDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<CollectionFullDTO> GetAllCollections()
        {
            var collections = _dbContext.Collections
                                        .Include(c => c.creator)
                                        .Select(c => new CollectionFullDTO
                                        {
                                            id = c.id,
                                            name = c.name,
                                            description = c.description,
                                            creator = new UserCompactDTO
                                            {
                                                id = c.creator.id,
                                                firstName = c.creator.firstName,
                                                lastName = c.creator.lastName,
                                            },
                                            products = c.products.Select(p => new ProductCompactDTO
                                            {
                                                id = p.id,
                                                name = p.name,
                                                thumbnailUrl = p.thumbnailUrl,
                                            }).ToList()
                                        }).ToList();
            return collections;
        }

        public CollectionFullDTO GetCollectionById (Guid id)
        {
            var collection = _dbContext.Collections
                                        .Include(c => c.creator)
                                        .Where(c => c.id == id)
                                        .Select(c => new CollectionFullDTO
                                        {
                                            id = c.id,
                                            name = c.name,
                                            description = c.description,
                                            creator = new UserCompactDTO
                                            {
                                                id = c.creator.id,
                                                firstName = c.creator.firstName,
                                                lastName = c.creator.lastName,
                                            }
                                        }).FirstOrDefault();
            return collection;
        }

        public CollectionFullDTO AddCollection (CollectionAddDTO newCollection)
        {
            var collection = new Collection
            {
                name = newCollection.name,
                description = newCollection.description,
                creatorId = newCollection.creatorId,
            };

            _dbContext.Collections.Add (collection);
            _dbContext.SaveChanges();

            return new CollectionFullDTO
            {
                id = collection.id,
                name = collection.name,
                description = collection.description,
                creator = new UserCompactDTO
                {
                    id = collection.creatorId,
                    firstName = _dbContext.Users.SingleOrDefault(u => u.id == collection.creatorId).firstName,
                    lastName = _dbContext.Users.SingleOrDefault(u => u.id == collection.creatorId).lastName,
                }
            };
        }

        public void UpdateCollection(Guid id, CollectionAddDTO updateCollection)
        {
            var collection = _dbContext.Collections.SingleOrDefault(c => c.id == id);
            collection.name = updateCollection.name;
            collection.description = updateCollection.description;
            _dbContext.Update(collection);
            _dbContext.SaveChanges();
        }

        public void DeleteCollection(Guid id)
        {
            var collection = _dbContext.Collections.SingleOrDefault(c => c.id == id);
            if (collection != null)
            {
                _dbContext.Remove(collection);
                _dbContext.SaveChanges();
            }
        }
    }
}



