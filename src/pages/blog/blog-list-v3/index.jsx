

import BlogList from "@/components/blog-meu-pages/blog-list-v3";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Blog List V3 || sentryspot - Job Borad ReactJs Template",
  description: "sentryspot - Job Borad ReactJs Template",
};

const BlogListpage3 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <BlogList />
    </>
  );
};

export default BlogListpage3
