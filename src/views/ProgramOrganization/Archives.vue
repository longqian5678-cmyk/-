<template>
  <div id="cve-secondary-page-main-container">
    <div class="columns is-centered">
      <div class="column is-8-desktop cve-main-column-content-width is-12-tablet">
        <main id="cve-main-page-content" role="main">
          <div class="content">
            <h1>Board Meetings & Discussion List Archives</h1>
            <AccordionContent header="Board Meeting Summaries Archive"
              v-model:expanded="meetingExpand">
              <p>The CVE Board regularly holds teleconferences,
                and periodically holds face-to-face meetings.
                Below are summaries of the Board meetings.
              </p>
              <div class="select">
                <select v-model="meetingYear">
                  <option v-for="year of meetingYears" :key="year">
                    {{year}}
                  </option>
                </select>
              </div>
              <ul>
                <li v-for="item of meetingData[meetingYear]" :key="item.name">
                  <div v-if="item.path.length">
                    <a :href="meetingURL(item.path)">{{item.name}}
                    </a>
                  </div>
                  <span v-else>
                    {{item.name}}
                  </span>
                </li>
              </ul>
            </AccordionContent>
            <AccordionContent header="Board Email Discussion List Archive"
              v-model:expanded="emailExpand">
              <p>
                The CVE Board has made a commitment to make its discussions
                available to the public. Board messages from July 2021 to the
                present are available at:
              </p>
                <blockquote>
                <a :href="meetingArchivePath" target="_blank">
                {{meetingArchivePath}}
                </a>
                </blockquote>
              <p>
                Board messages before July 2021 are available here:
              </p>
              <form>
                <div class="select">
                  <select v-model="discussionYear">
                    <option v-for="year of discussionYears" :key="year">
                      {{year}}
                    </option>
                  </select>
                </div>
                <div class="select">
                  <select v-model="traverse">
                    <option value="date" selected>By Date</option>
                    <option value="thread">By Thread</option>
                  </select>
                </div>
              </form>
              <ul>
                <li v-for="item of discussionData[discussionYear]" :key="item.month">
                  <a :href="discussionURL(item)">{{item.month}}</a>
                </li>
              </ul>
            </AccordionContent>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import AccordionContent from '@/components/AccordionContent.vue';
import meetingData from '@/assets/data/boardMeetings.json';
import {ref} from 'vue';

// There are 2 locations for the board archives: the snapshot of the old
// website (residing in S3), which is the "archivePath", and the "mail-archive"
// website that stores the more recent archives.  Before 2021, the meeting
// summaries are either PDF files or are HTML files in year/month-named
// subdirectories - these reside in the S3 old website directories.

const archivePath = '/Resources/Media/Archives/OldWebsite/data/board/archives';

const mailArchive = 'https://www.mail-archive.com';

const marcArchive = 'https://marc.info/?l=cve-editorial-board';

const marcParamRe = /^m=\d+&w=\d+$/i;

const meetingArchivePath = `${mailArchive}/cve-editorial-board-list@mitre.org`;

// These are the expansion state of the email and meeting accordion content.
// The initial state is controlled by these values.

const emailExpand = ref(false);

const meetingExpand = ref(false);

// This is a list of directory names containing the email discussion archives.
// The collection of these email discussions ended in 2021, so this list is
// most likely never going to change, so it's defined here (rather than in
// a separate data file).

const discussionDirs = [
  '1999-05',
  '1999-06',
  '1999-07',
  '1999-08',
  '1999-09',
  '1999-10',
  '1999-11',
  '1999-12',
  '2000-01',
  '2000-02',
  '2000-03',
  '2000-04',
  '2000-05',
  '2000-06',
  '2000-07',
  '2000-08',
  '2000-09',
  '2000-10',
  '2000-11',
  '2000-12',
  '2001-01',
  '2001-02',
  '2001-03',
  '2001-04',
  '2001-05',
  '2001-06',
  '2001-07',
  '2001-08',
  '2001-09',
  '2001-10',
  '2001-11',
  '2001-12',
  '2002-01',
  '2002-02',
  '2002-03',
  '2002-05',
  '2002-06',
  '2002-07',
  '2002-08',
  '2002-10',
  '2003-03',
  '2003-04',
  '2003-07',
  '2004-03',
  '2004-08',
  '2004-09',
  '2005-12',
  '2006-06',
  '2006-08',
  '2006-09',
  '2006-10',
  '2007-01',
  '2007-05',
  '2011-09',
  '2011-10',
  '2011-11',
  '2011-12',
  '2012-01',
  '2012-03',
  '2012-05',
  '2012-06',
  '2012-07',
  '2012-09',
  '2012-10',
  '2012-11',
  '2012-12',
  '2013-01',
  '2013-02',
  '2013-03',
  '2013-04',
  '2013-05',
  '2013-06',
  '2013-11',
  '2014-01',
  '2014-04',
  '2014-05',
  '2014-09',
  '2014-10',
  '2014-11',
  '2015-01',
  '2015-03',
  '2015-04',
  '2015-05',
  '2015-06',
  '2015-07',
  '2015-08',
  '2015-09',
  '2015-10',
  '2015-11',
  '2015-12',
  '2016-01',
  '2016-02',
  '2016-03',
  '2016-04',
  '2016-05',
  '2016-06',
  '2016-07',
  '2016-08',
  '2016-09',
  '2016-10',
  '2016-11',
  '2016-12',
  '2017-01',
  '2017-02',
  '2017-03',
  '2017-04',
  '2017-05',
  '2017-06',
  '2017-07',
  '2017-08',
  '2017-09',
  '2017-10',
  '2017-11',
  '2017-12',
  '2018-01',
  '2018-02',
  '2018-03',
  '2018-04',
  '2018-05',
  '2018-06',
  '2018-07',
  '2018-08',
  '2018-09',
  '2018-10',
  '2018-11',
  '2018-12',
  '2019-01',
  '2020-04',
  '2020-05',
  '2020-06',
  '2020-07',
  '2020-08',
  '2020-09',
  '2020-10',
  '2020-11',
  '2020-12',
  '2021-01',
  '2021-02',
  '2021-03',
  '2021-04',
  '2021-05',
  '2021-06'];

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];

// Board meeting archives are presented by year, in reverse order from the
// latest year available (which is likely the current year). 'meetingYear'
// is the year the user is currently viewing.

const meetingYears = Object.keys(meetingData).sort().reverse();

const meetingYear = ref(meetingYears[0]);

function defaultDict(createValue) {

    // This is equivalent to Python's defaultdict, which allows a dictionary
    // with a default value.  'createValue' is a callable that returns the
    // default value for dictionary entries.

    return new Proxy(Object.create(null), {
        get(target, property) {
            if (!(property in target))
                target[property] = createValue(property);
            return target[property];
        }
    });
}

function discussionURL(item) {

  // Given an item from 'discussionData', this returns the URL to either the
  // by-date (maillist) or by-thread discussion traversal.

  const url = archivePath + '/' + item.dir + '/'
    + (traverse.value === 'date' ? 'maillist.html' : 'threads.html');

  return url;
}

function meetingURL(name) {

  // Given a file name of a board meeting summary, which is either a PDF file or
  // an HTML file, this returns the URL to the meeting summary.  In 2025,
  // the meeting summaries started being kept on a mail archive server, so
  // if we're given an HTML file, we assume it's for the server; a PDF file
  // is stored in the S3 archive path, as well as any HTML file that resides
  // in a subdirectory.

  const url = (marcParamRe.test(name) ? `${marcArchive}&` :
    (!name.includes('/') && name.endsWith('.html')
    ? meetingArchivePath : archivePath) + '/') + name;

  return url;
}

function parseDiscussionDates(discussionData) {

  // The given dictionary (whose values default to an empty list) is populated
  // with a mapping of discussion year to a list of months that have archived
  // discussions.  The value representing each month is an object containing
  // the month name and subdirectory name.

  for (let monthDir of discussionDirs.sort().reverse()) {

    const match = /(?<year>\d{4})-(?<month>\d{2})/.exec(monthDir);

    const year = match.groups.year;
    const month = months[parseInt(match.groups.month, 10) - 1];

    discussionData[year].push({month: month, dir: monthDir});
  }
}

const discussionData = defaultDict(() => []);

parseDiscussionDates(discussionData);

// Discussion archives are presented by year, in reverse order from the
// latest year available (2019). 'discussionYear' is the year the user is
// currently viewing.  'traverse' is the current selection for traversing
// the list by-date or by-thread.

const discussionYears = Object.keys(discussionData).sort().reverse();

const discussionYear = ref(discussionYears[0]);

const traverse = ref('date');

</script>
