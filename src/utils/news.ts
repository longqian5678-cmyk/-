import newsData from '@/assets/data/news.json';
import type {NavigationGuard} from 'vue-router';

// This code populates the "id" field in each news item, with the first item
// (most recent) having the largest id, and the last item having the id of 1.
// The id field is used for the key value in "v-for" loops.

let id = newsData.currentNews.length;

const news = {
  ...newsData,
  currentNews: newsData.currentNews.map((item) => ({
    ...item,
    id: id--
  }))
};

export default news;

export const archivedOldNews: NavigationGuard = (to) => {

  // This navigation guard checks the route parameters to determine whether
  // a news article from an archived year is being requested.  If so, the route
  // is redirected to the archive news file for the requested year.

  const newsType: string = to.params.newsType as string;

  if (newsType.toLocaleLowerCase() != 'news')
    return true;

  const requestYear: string = to.params.year as string;

  const year: number = parseInt(requestYear);

  if (year >= news.archiveNews.startYear && year <= news.archiveNews.endYear) {

    // The news for the requested year has been archived.  Two things are done
    // here: set the location to the archive URL to get CloudFront to serve the
    // year's file, and then set the page for the Vue router to display the
    // news archive page.

    const archiveUrl = `${news.archiveNews.directory}/${requestYear}`
                       + news.archiveNews.suffix;

    window.location.replace(archiveUrl);

    return {name: 'NewsArchives'};
  }

  return true;
};
