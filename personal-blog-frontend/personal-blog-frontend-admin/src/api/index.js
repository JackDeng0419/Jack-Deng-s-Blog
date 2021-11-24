import ajax from './ajax';

export const reqLogin = (username, password, remember) =>
    ajax('/api/login', { username, password, remember }, 'POST');

export const reqCategories = () => ajax('/manage/category/list', {});

export const reqAddCategory = ({ name, desc, icon }) =>
    ajax('/manage/category/add', { name, desc, icon }, 'POST');

export const reqUpdateCategory = ({ categoryId, name, desc, icon }) =>
    ajax('/manage/category/update', { categoryId, name, desc, icon }, 'POST');

export const reqDeleteCategory = ({ category_id, blog_num }) =>
    ajax('/manage/category/delete', { category_id, blog_num }, 'POST');

export const reqAddTag = ({ name, color }) =>
    ajax('/manage/tag/add', { name, color }, 'POST');

export const reqDeleteTag = (tag_id) =>
    ajax('/manage/tag/delete', { tag_id }, 'POST');

export const reqTags = () => ajax('/manage/tag/list', {});

export const reqUpdateTag = ({ tag_id, name, color }) =>
    ajax('/manage/tag/update', { tag_id, name, color }, 'POST');

export const reqAddBlog = ({ title, category_id, content, tags_id, desc }) =>
    ajax(
        '/manage/blog/add',
        { title, category_id, content, tags_id, desc },
        'POST',
    );

export const reqBlogs = () => ajax('/manage/blog/list', {});

export const reqUpdateBlogStatus = ({ blog_id, status }) =>
    ajax('/manage/blog/updateStatus', { blog_id, status }, 'POST');

export const reqDeleteBlog = (blog_id) =>
    ajax('/manage/blog/delete', { blog_id }, 'POST');

export const reqEditBlog = ({
    blog_id,
    title,
    category_id,
    tags_id,
    content,
    desc,
}) =>
    ajax(
        '/manage/blog/edit',
        { blog_id, title, category_id, tags_id, content, desc },
        'POST',
    );

export const reqBlogContentById = (blog_id) =>
    ajax('/manage/blog/blogContentById', { blog_id });
