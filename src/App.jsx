import { useState } from 'react'
import { CalendarProvider, ClientContainer, Header, ChangeBadgeVariantInput, ChangeVisibleHoursInput, ChangeWorkingHoursInput } from './index'
import { USERS_MOCK, CALENDAR_ITEMS_MOCK } from './calendar/mocks'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/ui/accordion'

function App() {
  const [view, setView] = useState('month')

  // Example: Custom API functions (uncomment to use real API)
  // const calendarAPI = {
  //   getEvents: async () => {
  //     const response = await fetch('/api/events')
  //     return response.json()
  //   },
  //   getUsers: async () => {
  //     const response = await fetch('/api/users')
  //     return response.json()
  //   },
  //   createEvent: async (eventData) => {
  //     const response = await fetch('/api/events', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(eventData),
  //     })
  //     return response.json()
  //   },
  //   updateEvent: async (eventData) => {
  //     const response = await fetch(`/api/events/${eventData.id}`, {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(eventData),
  //     })
  //     return response.json()
  //   },
  //   deleteEvent: async (eventId) => {
  //     await fetch(`/api/events/${eventId}`, { method: 'DELETE' })
  //   },
  // }

  // Example: Custom settings
  const customSettings = {
    badgeVariant: 'colored',
    visibleHours: { from: 7, to: 18 },
    workingHours: {
      0: { from: 0, to: 0 },
      1: { from: 8, to: 17 },
      2: { from: 8, to: 17 },
      3: { from: 8, to: 17 },
      4: { from: 8, to: 17 },
      5: { from: 8, to: 17 },
      6: { from: 8, to: 12 },
    },
  }

  // Example: Callbacks for API operations
  const handleSettingsChange = (settings) => {
    console.log('Settings changed:', settings)
    // You can sync settings to your backend here
  }

  const handleEventCreate = (event) => {
    console.log('Event created:', event)
    // You can trigger additional actions here
  }

  const handleEventUpdate = (event) => {
    console.log('Event updated:', event)
    // You can trigger additional actions here
  }

  const handleEventDelete = (eventId) => {
    console.log('Event deleted:', eventId)
    // You can trigger additional actions here
  }

  return (
    <CalendarProvider 
      // Option 1: Use mocks (default behavior)
      useMocks={true}
      
      // Option 2: Provide initial data
      // users={USERS_MOCK}
      // events={CALENDAR_ITEMS_MOCK}
      
      // Option 3: Provide custom API functions
      // api={calendarAPI}
      
      // Custom default settings
      defaultSettings={customSettings}
      
      // Callbacks
      onSettingsChange={handleSettingsChange}
      onEventCreate={handleEventCreate}
      onEventUpdate={handleEventUpdate}
      onEventDelete={handleEventDelete}
    >
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="mx-auto flex max-w-screen-2xl flex-col gap-4 p-4">
          {/* Example: Hide header or customize it */}
          <ClientContainer 
            view={view} 
            onViewChange={setView}
            showHeader={true}
            headerProps={{
              showTodayButton: true,
              showDateNavigator: true,
              showViewSwitcher: true,
              showUserSelect: true,
              showAddEventButton: true,
              // availableViews: ['day', 'week', 'month'], // Limit available views
            }}
          />
          
          <div className="w-full">
            <Accordion type="multiple" defaultValue={['badge-variant']} className="w-full">
              <AccordionItem value="badge-variant">
                <AccordionTrigger>Badge Variant</AccordionTrigger>
                <AccordionContent>
                  <ChangeBadgeVariantInput />
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="visible-hours">
                <AccordionTrigger>Visible Hours</AccordionTrigger>
                <AccordionContent>
                  <ChangeVisibleHoursInput />
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="working-hours">
                <AccordionTrigger>Working Hours</AccordionTrigger>
                <AccordionContent>
                  <ChangeWorkingHoursInput />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </main>
      </div>
    </CalendarProvider>
  )
}

export default App
