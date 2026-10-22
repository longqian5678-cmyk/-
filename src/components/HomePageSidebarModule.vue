<template>
  <aside class="column is-3">
    <div class="content">
      <h3 class="title cve-news-title-padding">
        <router-link class="has-text-black" to="/Media/News/AllNews">News</router-link>
      </h3>
      <div>
        <table class="table is-narrow" role="presentation">
          <tbody>
            <tr v-for="newsItem in topNews()" :key="newsItem.id">
              <td style="width: 10%">
                <span class="icon">
                  <p :id="`blogIcon-${newsItem.id}`" class="is-hidden">blog</p>
                  <font-awesome-icon size="1x" icon="blog"  v-if="newsItem.newsType == 'blog'"
                    :aria-labelledby="`blogIcon-${newsItem.id}`" aria-hidden="false"/>
                  <p :id="`podcastIcon-${newsItem.id}`" class="is-hidden">podcast</p>
                  <font-awesome-icon size="1x" icon="podcast"  v-if="newsItem.newsType == 'podcast'"
                    :aria-labelledby="`podcastIcon-${newsItem.id}`" aria-hidden="false"/>
                  <p :id="`newsIcon-${newsItem.id}`" class="is-hidden">news</p>
                  <font-awesome-icon size="1x" :icon="['far', 'newspaper']"  v-if="newsItem.newsType == 'news'"
                    :aria-labelledby="`newsIcon-${newsItem.id}`" aria-hidden="false"/>
                  <p :id="`tweetIcon-${newsItem.id}`" class="is-hidden">tweet</p>
                  <font-awesome-icon size="1x" :icon="['fab', 'twitter']"  v-if="newsItem.newsType == 'tweet'"
                    :aria-labelledby="`tweetIcon-${newsItem.id}`" aria-hidden="false"/>
                  <font-awesome-icon size="1x" icon="bullhorn" v-if="newsItem.newsType == 'press-release'"
                    :aria-labelledby="`pressReleaseIcon${newsItem.id}`" aria-hidden="false"/>
                </span>
              </td>
              <td>
                <router-link :to="`/Media/News/item/${newsItem.newsType}/${newsItem.itemUrl}`"
                 v-html="newsItem.title">
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="has-text-right" style="margin-top: -24px;">
          <button class="button is-ghost cve-is-borderless has-text-weight-bold has-text-grey-dark" @click="toggleNewsIconsMap()">
            <span class="icon-text is-uppercase is-size-7" >
              news icons
              <font-awesome-icon size="1x" icon="info-circle" />
            </span>
          </button>
        </div>
        <div class="level" :class="{'cve-display-none': hideNewsIconsMap}">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Blog</p>
              <span class="icon">
                <p id="blogIconDesc" class="is-hidden">blog icon</p>
                <font-awesome-icon size="1x" class="cve-news-icon" icon="blog"
                  aria-labelledby="blogIconDesc" aria-hidden="false"/>
              </span>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Podcast</p>
              <span class="icon">
                <p id="podcastIconDesc" class="is-hidden">podcast icon</p>
                <font-awesome-icon size="1x" class="cve-news-icon" icon="podcast"
                  aria-labelledby="podcastIconDesc" aria-hidden="false"/>
              </span>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">News</p>
              <span class="icon">
                <p id="newsIconDesc" class="is-hidden">news icon</p>
                <font-awesome-icon class="cve-news-icon" :icon="['far', 'newspaper']"
                  aria-labelledby="newsIconDesc" aria-hidden="false"/>
              </span>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Press Release</p>
              <span class="icon">
                <p id="pressReleaseIconDesc" class="is-hidden">press release icon</p>
                <font-awesome-icon size="1x" class="cve-press-release-icon" icon="bullhorn"
                  aria-labelledby="pressReleaseIconDesc" aria-hidden="false"/>
              </span>
            </div>
          </div>
        </div>

      <div class="cve-expansion-bar">
        <router-link class="cve-expansion-button" to="/Media/News/AllNews">More news</router-link>
      </div>
      </div>
      <h3 class="title cve-events-title-padding">
        <router-link class="has-text-black" to="/Media/Events">Events</router-link>
      </h3>
      <table class="table is-narrow" role="presentation">
        <tbody>
          <tr v-for="event in topEvents()" :key="event.id">
            <td style="width: 10%">
              <span class="icon">
                <p :id="`publicOrPrivate-${event.id}`" class="is-hidden"> {{(event.permission == 'public') ?
                  'public event' : 'private event'}} </p>
                <font-awesome-icon class="cve-news-icon" :icon="event.permission == 'public' ? 'passport' : 'id-card'"
                  :aria-labelledby="`publicOrPrivate-${event.id}`" aria-hidden="false"/>
              </span>
            </td>
            <td>
              <p class="">{{event.title}}</p>
              <p class="is-capitalized cve-help-text">
                <span v-if="event.date.repeat">
                  <span v-if="event.date.repeat.recurrence == 'monthly'">Monthly on {{event.date.repeat.day}}</span>
                  <span v-else-if="event.date.repeat.recurrence == 'biweekly'">Every other {{event.date.repeat.day}}</span>
                  <span v-else-if="event.date.repeat.recurrence === ''">{{event.date.repeat.day}}</span>
                  <span v-else>Every {{event.date.repeat.day}}</span>
                </span>
                <span v-else>
                  {{formatDate(event.date.start)}} {{(event.date.start !== event.date.end) ? '— ' + formatDate(event.date.end) : ''}}
                </span>
                <span> | {{event.location}}</span>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="has-text-right" style="margin-top: -16px;">
        <button class="button is-ghost cve-is-borderless has-text-weight-bold has-text-grey-dark" @click="toggleEventIconsMap()">
          <span class="icon-text is-uppercase is-size-7 has-text-grey-dark" >
            event icons
            <font-awesome-icon size="1x" icon="info-circle" />
          </span>
        </button>
      </div>
      <div class="level" :class="{'cve-display-none': hideEventIconsMap}">
          <div class="level-item has-text-centered">
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Public</p>
              <span class="icon">
                <p id="publicIconDesc" class="is-hidden">public event icon</p>
                <font-awesome-icon class="cve-news-icon" icon="passport" aria-labelledby="publicIconDesc" aria-hidden="false"/>
              </span>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Private</p>
              <span class="icon">
                <p id="privateIconDesc" class="is-hidden">private event icon</p>
                <font-awesome-icon class="cve-news-icon" icon="id-card" aria-labelledby="privateIconDesc" aria-hidden="false"/>
              </span>
            </div>
          </div>
          <div class="level-item has-text-centered">
          </div>
        </div>
      <div class="cve-expansion-bar">
          <router-link class="cve-expansion-button" to="/Media/Events">More Events</router-link>
      </div>
    </div>
  </aside>
</template>

<script setup>
import news from '@/utils/news';
import eventsData from '../assets/data/events.json';
import newsMixins from '../mixins/newsMixins';
import {ref} from 'vue';

const eventsList = eventsData.currentEvents;
const newsList = news.currentNews;
const orderAttr = 'displayOnHomepageOrder';

// This is today's date at midnight.

const currentDate = new Date(new Date().setHours(0, 0, 0, 0));

// The following are how many events and news items to display in the sidebar.

const showEventCount = 2;
const showNewsCount = 6;

// This is used for news and events that do not have a specified "home page
// order".  The number in the definition below must be larger than the largest
// of the 2 above counts.

const noOrderSpecified = 999;

// This defines what's considered close enough (in days) to today for an event
// start date to prioritize its display.

const upcomingEventDays = 90;

const Days = Object.freeze({
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6
});

let hideEventIconsMap = ref(true);
let hideNewsIconsMap = ref(true);

function topNews() {

  // This function returns an array of news articles to be displayed in the home
  // page news sidebar.  Any article with a "home page order" of zero is not
  // displayed.

  const displayableNews =
    newsList.filter(news => news.displayOnHomepageOrder !== 0);

  // The maximum number of articles returned is specified as the first number
  // below:

  const maxNewsItems = Math.min(showNewsCount, displayableNews.length);

  const orderedNews = displayableNews.toSorted(orderNews);

  const displayNews = orderedNews.slice(0, maxNewsItems);

  // The 'itemUrl' attribute is added to each news article to be
  // displayed.

  displayNews.forEach((i) => i.itemUrl = newsMixins.methods.createItemUrlDetail(i));

  return displayNews;
}

function orderNews(news1, news2) {

  // This is a comparison function used for sorting news articles.
  // News articles are sorted as follows (in preference order):
  //
  //    1) "home page order" - only if it exists and is non-zero.
  //       News with lowest number displayed first.
  //    2) News article date - most recent first.
  //    3) News article identifier number - highest first.
  //
  // An explicitly set home page order of zero will cause the article
  // to sort last (i.e., it won't be displayed).

  const result = homePageOrder(news1, news2);

  return result || news2.date.localeCompare(news1.date) || news2.id - news1.id;
}

function homePageOrder(newsOrEvent1, newsOrEvent2) {

  // This is a "helper" function used in both the news and events comparison for
  // sorting.  This will return that the two news/events are the same for
  // comparison unless either or both have the "displayOnHomepageOrder"
  // attribute set.  Zero sorts at the lowest priority (effectively preventing
  // the item from being displayed).  Highest "priority" order is value 1 and
  // descreasing sequentially.

  const displayOrder1 = Object.hasOwn(newsOrEvent1, orderAttr)
    ? newsOrEvent1.displayOnHomepageOrder : noOrderSpecified;

  const displayOrder2 = Object.hasOwn(newsOrEvent2, orderAttr)
    ? newsOrEvent2.displayOnHomepageOrder : noOrderSpecified;

  if (displayOrder1 !== noOrderSpecified
      || displayOrder2 !== noOrderSpecified) {

    // Either one or both items have a specified display order.

    if (displayOrder2 === displayOrder1)
        return 0;

    if (displayOrder2 === noOrderSpecified)
        return displayOrder1 > 0 ? -1 : 1

    if (displayOrder1 === noOrderSpecified)
        return displayOrder2 > 0 ? 1 : -1;
  }

  // Either both items do or both don't have a specified display order.  For
  // no display order, the items are the same "weight" for sorting (and need
  // another differentiation (e.g., date)).

  return displayOrder1 - displayOrder2;
}

function topEvents() {

  // This function returns an array of events to be displayed in the home page
  // news sidebar.  Any event with a "home page order" of zero is not displayed.

  const displayableEvents =
    eventsList.filter(event => event.displayOnHomepageOrder !== 0);

  // The maximum number of events returned is specified as the first number
  // below:

  const maxEventItems = Math.min(showEventCount, displayableEvents.length);

  // Exclude any events that have occurred in the past.

  const currentEvents = displayableEvents.filter(eventNotExpired);

  currentEvents.sort(orderEvents);

  return currentEvents.slice(0, maxEventItems);
}

function eventNotExpired(event) {

  // This function returns true if the given event is still active.

  if (event.date.end === 'ongoing')
    return true;

  const endDate = parseDateString(event.date.end);

  return endDate >= currentDate;
}

function orderEvents(event1, event2) {

  // This is a comparison function used for sorting events.
  // Events are sorted as follows (in preference order):
  //
  //    1) "home page order" - only if it exists and is non-zero.
  //       Events with lowest number displayed first.
  //    2) Upcoming events that are within the "close enough" window to
  //       today's date.
  //    3) Recurring events follow.  For events on regular days (e.g.,
  //       every Monday), we try to display the ones for the current
  //       day or the next regular event day.

  const result = homePageOrder(event1, event2);

  if (result)
    return result;

  const recurring1 = event1.date.repeat.recurrence !== undefined;

  const recurring2 = event2.date.repeat.recurrence !== undefined;

  if (recurring1 && recurring2)
    return selectRecurringEvent(event1, event2);

  if (recurring1 !== recurring2) {

    // One event is recurring and the other isn't.  For the non-recurring
    // event, if it's in the "near future" we will favor that over the
    // recurring event.

    if (!recurring1 && isUpcomingEvent(event1))
      return -1;

    if (!recurring2 && isUpcomingEvent(event2))
      return 1;
  }

  // Of the 2 events, neither is a non-recurring upcoming event, so we'll
  // just sort by the event start date.  For events, we want to sort by
  // **ascending** dates, which is different from how we sort the news.
  // This is because we want the events that occur soonest to be listed
  // before events happening later on.  We break the tie on the same
  // start date by using the event id.

  return (event1.date.start.localeCompare(event2.date.start)
          || event1.id - event2.id);
}

function selectRecurringEvent(event1, event2) {

  // Given 2 recurring events, select the one that occurs on the day closest
  // to the current day.  This is used in sorting the events, and is called
  // by orderEvents().

  const today = currentDate.getDay();

  let event1Day = Days[event1.date.repeat.day.toLowerCase()];

  let event2Day = Days[event2.date.repeat.day.toLowerCase()];

  // An event day may be undefined because the "repeat.day" value is not
  // a valid day name - a real example is the use of "As Needed".  In this
  // case, the event will sort after any valid recurring event (because its
  // value (20) is way beyond the valid day values).

  if (event1Day === undefined)
    event1Day = 20;

  if (event2Day === undefined)
    event2Day = 20;

  if (event1Day < today)
    event1Day += 7;

  if (event2Day < today)
    event2Day += 7;

  const event1Dist = event1Day - today;

  const event2Dist = event2Day - today;

  return event1Dist - event2Dist;
}

function parseDateString(dateString) {

  // Given a date string of the form <year>-<month>-<day> (e.g., 2025-09-25),
  // this function parses the date string and returns a Date object.

  const dateRegex = /^(?<year>\d{4})-(?<month>\d{1,2})-(?<day>\d{1,2})$/;

  const dateMatch = dateRegex.exec(dateString);

  if (!dateMatch) {

    // The date's bad - hopefully, it will get noticed in the console.
    // Return today's date to prevent a crash, even though it's most likely
    // not right.

    console.log(`? ${dateString} - incorrect date format yyyy-mm-dd`);

    return currentDate;
  }

  const year = dateMatch.groups.year;

  const monthIdx = dateMatch.groups.month - 1;

  const day = dateMatch.groups.day;

  return new Date(new Date(year, monthIdx, day).setHours(0, 0, 0, 0));
}

function isUpcomingEvent(event) {

  // This function returns true if the given event starts within so many
  // days (defined in upcomingEventDays) of the current day.  This is used
  // to favor displaying upcoming events before recurring events.

  const mSecPerDay = 1000 * 60 * 60 * 24;

  const startDate = parseDateString(event.date.start);

  const days2Start = Math.round((startDate - currentDate) / mSecPerDay);

  const endDate = parseDateString(event.date.end);

  // The event is upcoming if the number of days before the start date is
  // within the number considered as an "upcoming" event.  It's also still
  // "upcoming" if the start date has passed ("days2Start" is negative) but
  // the end date hasn't passed.

  return (days2Start <= upcomingEventDays && days2Start > 0
          || days2Start <= 0 && currentDate <= endDate);
}

function toggleNewsIconsMap() {
   hideNewsIconsMap.value = !hideNewsIconsMap.value;
}

function toggleEventIconsMap() {
   hideEventIconsMap.value = !hideEventIconsMap.value;
}

function formatDate(newsDate) {
  const [year, month, day] = newsDate.split('-');
  const formattedDate = new Date();
  formattedDate.setFullYear(parseInt(year, 10));
  formattedDate.setMonth(parseInt(month, 10) - 1, parseInt(day, 10));
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return formattedDate.toLocaleDateString(undefined, options);
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

@use 'variables' as *;

.cve-display-none {
  display: none;
}

.cve-expansion-bar {
    margin: 1em 0;
    height: 0;
    border-top: solid 3px #d4d4d3;
    text-align: center;
}

.cve-expansion-bar .cve-expansion-button {
    position: relative;
    top: -1em;
    background-color: #ffffff;
    border: none;
    padding: 0 1em;
    text-transform: uppercase;
    font-size: 14px;
}
.content {
  background-color: white;
  border-radius: $cve-border-radius;
}

.content p:not(:last-child) {
  margin-bottom: 0.2rem;
}

.cve-news-title-padding {
  padding: 0.5rem 0 0 0.5rem;
}

.cve-events-title-padding {
  padding: 0rem 0 0 0.5rem;
}

.table td {
  border: none !important;
}

tr {
  text-align: left;
}

.cve-news-icon {
  color: $theme-color-primary-darker;
}

.title {
  text-align: left;
  font-weight: unset;
}

</style>
