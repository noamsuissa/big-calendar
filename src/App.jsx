import { useState } from 'react'
import { CalendarProvider, ClientContainer, Header, ChangeBadgeVariantInput, ChangeVisibleHoursInput, ChangeWorkingHoursInput } from './index'
import { USERS_MOCK, CALENDAR_ITEMS_MOCK } from './calendar/mocks'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/ui/accordion'

function App() {
  const [view, setView] = useState('month')

  return (
    <CalendarProvider users={USERS_MOCK} events={CALENDAR_ITEMS_MOCK}>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="mx-auto flex max-w-screen-2xl flex-col gap-4 p-4">
          <ClientContainer view={view} onViewChange={setView} />
          
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
