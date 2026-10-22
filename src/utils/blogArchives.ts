import blogArchiveData from '@/assets/data/blogArchives.json';
import newsMixins from '@/mixins/newsMixins';
import {normalizeDate} from '@/utils/strUtils';
import type {NavigationGuard} from 'vue-router';

interface BlogData {
  date: string;
  fileName: string;
  title: string;
}

type BlogArchive = Record<string, Array<BlogData>>;

export const blogArchives = blogArchiveData as BlogArchive;

// Sort the years of block archives in descending order, from the last
// year archived to the first.

export const blogArchiveYears: string[] = Object.keys(blogArchives)
  .filter(k => /^\d{4}$/.test(k))
  .sort((y1, y2) => Number(y2) - Number(y1));


Object.keys(blogArchives).forEach((year: string) => {

  // Sort the blog articles for each year in descending order from the end
  // of the year.

  blogArchives[year].sort((b1, b2) => {

    // This handles dates that aren't in yyyy-mm-dd format, e.g.,
    // 2022-5-17, 2026-2-4.  The dates do have to be at least in the
    // yyyy-[m]m-[d]d format.

    const date1 = normalizeDate(b1.date);
    const date2 = normalizeDate(b2.date);

    return date2.localeCompare(date1)});
});

export const archivedOldBlogs: NavigationGuard = (to) => {

  // This navigation guard checks the route parameters to determine whether
  // an archived blog is being requested.  If it can be located, the route
  // is redirected to the archived blog.

  const newsType: string = to.params.newsType as string;

  if (newsType.toLocaleLowerCase() != 'blog')
    return true;

  const blogArchiveURL = '/Resources/Media/Archives/Blogs';

  const requestTitle: string = to.params.shortTitle as string;

  const requestYear: string = to.params.year as string;

  if (blogArchiveYears.includes(requestYear)) {

    const requestDate = normalizeDate(`${to.params.year}-${to.params.month}-`
                                      + to.params.day);

    const yearBlogs = blogArchives[requestYear];

    let blogIdx = yearBlogs.findIndex((blog) => {

      return normalizeDate(blog.date) === requestDate;
    });

    // blogIdx points to the first archived blog for the request date.
    // Usually, there's only one blog for a given date, but there may be
    // more than one.  Because the list of archived blogs is sorted by
    // date, any blogs on the same date are in the list just following
    // the first one found.

    while (blogIdx >= 0 && blogIdx < yearBlogs.length) {

      const archivedBlog = yearBlogs[blogIdx];

      if (normalizeDate(archivedBlog.date) !== requestDate)
        break;

      if (newsMixins.methods.createShortTitle(archivedBlog) === requestTitle) {

        // This is the requested blog.  Two things are done here:
        // set the location to the archive URL to get CloudFront to serve
        // the file, and then set the page for the Vue router to display
        // the archive page for the requested year (via "break").

        const archiveUrl = `${blogArchiveURL}/${requestYear}`
                           + `/${yearBlogs[blogIdx].fileName}`;

        window.location.replace(archiveUrl);

        break;
      }

      blogIdx++;
    }

    return {name: 'BlogArchives', params: {year: requestYear}};
  }

  return true;
};
