import { client } from '@/sanity/client';
import groq from 'groq';
import { PortableText } from '@portabletext/react';
import {
  EventsPageCombinedData,
  EventItemData,
  GroupedEvents,
} from '@/types/sanity';

const eventsQuery = groq`
  {
    // Fetch the schedule page singleton data
    "pageData": *[_type == "schedulePage" && _id == "schedulePage"][0] {
      _id,
      pageTitle,
      introduction,
      schedulePdf {
        asset->{
          url,
          originalFilename
        }
      }
    },
    "events": *[_type == "eventItem"] | order(startDateTime asc) {
      _id,
      title,
      startDateTime,
      endDateTime,
      location,
      description,
      requiresExtraCost,
      costDetails,
      isOffSite,
      offSiteAddress,
      organizerContact
    }
  }
`;

const formatTime = (dateString?: string): string => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'America/Los_Angeles',
    });
  } catch (e) {
    console.error('Error formatting time:', dateString, e);
    return 'Invalid Time';
  }
};

const groupEventsByDay = (eventList: EventItemData[]): GroupedEvents => {
  if (!eventList) return {};
  return eventList.reduce((acc, event) => {
    if (!event.startDateTime) return acc; // Skip events without start date

    try {
      const startDate = new Date(event.startDateTime);
      // Format the date key (e.g., "Thursday, May 8, 2025")
      // Specify timezone consistent with event location (e.g., America/Chicago)
      // Adjust 'en-US' locale if needed
      const dateKey = startDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'America/Los_Angeles',
      });

      if (!acc[dateKey]) {
        acc[dateKey] = []; // Initialize array for this date
      }
      acc[dateKey].push(event); // Add event to the correct date array
    } catch (e) {
      console.error(
        'Error processing date for event:',
        event.title,
        event.startDateTime,
        e
      );
    }
    return acc;
  }, {} as GroupedEvents); // Initialize with the correct type
};

export default async function EventsPage() {
  const data: EventsPageCombinedData | null = await client.fetch(eventsQuery);

  if (!data?.pageData) {
    if (!data?.events || data.events.length === 0) {
      return (
        <div>Schedule page content not found. Please add it in the Studio.</div>
      );
    }
  }

  const { pageData, events } = data;
  const displayTitle = pageData?.pageTitle || 'Event Schedule';

  const groupedEvents = groupEventsByDay(events);

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1>{displayTitle}</h1>

      {pageData?.introduction && (
        <div style={{ margin: '2rem 0' }}>
          <PortableText value={pageData.introduction} />
        </div>
      )}

      {pageData?.schedulePdf?.asset?.url && (
        <div style={{ margin: '2rem 0', textAlign: 'center' }}>
          <a
            href={pageData.schedulePdf.asset.url}
            download={
              pageData.schedulePdf.asset.originalFilename ||
              'smokeout_schedule.pdf'
            }
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '0.8rem 1.5rem',
              backgroundColor: 'darkred',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
            }}
          >
            Download Schedule PDF
          </a>
        </div>
      )}

      <div style={{ marginTop: '3rem' }}>
        {Object.keys(groupedEvents).length > 0 ? (
          Object.entries(groupedEvents).map(([dateKey, eventsOnDay]) => (
            <section key={dateKey} style={{ marginBottom: '3rem' }}>
              <h2
                style={{
                  borderBottom: '2px solid #eee',
                  paddingBottom: '0.5rem',
                  marginBottom: '1.5rem',
                }}
              >
                {dateKey}
              </h2>
              {eventsOnDay.map((event) => (
                <div
                  key={event._id}
                  style={{
                    marginBottom: '1.5rem',
                    paddingLeft: '1rem',
                    borderLeft: '3px solid lightblue',
                  }}
                >
                  <p style={{ margin: '0 0 0.25rem 0' }}>
                    <strong>{formatTime(event.startDateTime)}</strong>
                    {event.endDateTime && ` - ${formatTime(event.endDateTime)}`}
                  </p>
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2em' }}>
                    {event.title || 'Untitled Event'}
                  </h3>
                  <p style={{ margin: '0 0 0.5rem 0' }}>
                    <em>Location:</em> {event.location || 'TBA'}
                    {event.isOffSite && event.offSiteAddress && (
                      <span
                        style={{
                          display: 'block',
                          fontSize: '0.9em',
                          color: '#555',
                          marginTop: '0.25rem',
                        }}
                      >
                        Address:{' '}
                        {event.offSiteAddress.split('\n').map((line, i) => (
                          <span key={i}>
                            {line}
                            <br />
                          </span>
                        ))}
                      </span>
                    )}
                  </p>
                  {event.requiresExtraCost && (
                    <p
                      style={{
                        margin: '0 0 0.5rem 0',
                        fontWeight: 'bold',
                        color: 'darkorange',
                      }}
                    >
                      Cost: {event.costDetails || 'Extra cost applies'}
                    </p>
                  )}
                  {event.description && (
                    <div
                      style={{
                        fontSize: '0.95em',
                        marginLeft: '1rem',
                        color: '#9e9e9e',
                      }}
                    >
                      <PortableText value={event.description} />
                    </div>
                  )}
                  {event.organizerContact && (
                    <p
                      style={{
                        fontSize: '0.9em',
                        margin: '0.5rem 0 0 0',
                        color: '#555',
                      }}
                    >
                      Contact: {event.organizerContact}
                    </p>
                  )}
                </div>
              ))}
            </section>
          ))
        ) : (
          <p>No events scheduled yet. Please check back later!</p>
        )}
      </div>
    </div>
  );
}
