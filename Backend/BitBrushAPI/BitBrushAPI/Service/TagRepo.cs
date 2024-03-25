using BitBrushAPI.Data;
using BitBrushAPI.Model;
using Microsoft.EntityFrameworkCore;
using static BitBrushAPI.Service.ProductRepo;

namespace BitBrushAPI.Service
{
    public interface ITagRepo
    {
        public List<TagFullDTO> GetAllTags();
        public TagFullDTO GetTagById(Guid id);
        public TagFullDTO AddTag(TagAddDTO newPTag);
        public void UpdateTag(Guid id, TagAddDTO updateTag);
        public void DeleteTag(Guid id);
    }
    public class TagRepo : ITagRepo
    {
        private readonly MyDBContext _dbContext;

        public TagRepo(MyDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<TagFullDTO> GetAllTags()
        {
            var tags = _dbContext.Tags
                                    .Select(p => new TagFullDTO
                                    {
                                        id = p.id,
                                        name = p.name,
                                    }).ToList();
            return tags;
        }

        public TagFullDTO GetTagById(Guid id)
        {
            var tag = _dbContext.Products
                                    .Where(t => t.id == id)
                                    .Select(p => new TagFullDTO
                                    {
                                        id = p.id,
                                        name = p.name,
                                    }).FirstOrDefault();
            return tag;
        }

        public TagFullDTO AddTag(TagAddDTO newTag)
        {
            var tag = new Tag
            {
                name = newTag.name,
            };

            _dbContext.Tags.Add(tag);
            _dbContext.SaveChanges();

            return new TagFullDTO
            {
                id = tag.id,
                name = tag.name,
            };
        }

        public void UpdateTag(Guid id, TagAddDTO updateTag)
        {
            var tag = _dbContext.Tags.SingleOrDefault(t => t.id == id);
            tag.name = updateTag.name;
            _dbContext.Update(tag);
            _dbContext.SaveChanges();
        }

        public void DeleteTag(Guid id)
        {
            var tag = _dbContext.Tags.SingleOrDefault(t => t.id == id);
            if (tag != null)
            {
                _dbContext.Remove(tag);
                _dbContext.SaveChanges();
            }
        }
    }
}
