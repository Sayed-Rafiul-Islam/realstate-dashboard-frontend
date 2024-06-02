"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
    onPickDate : (date : string) => void,
    label : string,
    clearDate : boolean
}

export const DatePicker  : React.FC<DatePickerProps> = ({
    onPickDate,
    label,
    clearDate
}) => {
    const [date, setDate] = React.useState<Date>()
    const [open, setOpen] = React.useState(false)

    React.useEffect(()=>{
        onPickDate(date ? date.toISOString() : '')
      },[date])
    React.useEffect(()=>{
      if (clearDate === true) {
        onPickDate('')
        setDate(undefined)
      }
        
      },[clearDate])
  return (
    <Popover open={open}>
      <PopoverTrigger asChild>
        <Button
        onClick={()=>setOpen(true)}
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{label}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" onInteractOutside={()=>setOpen(false)}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={e=>{
            setDate(e)
            // setOpen(false)
          }}
          onDayClick={()=>setOpen(false)}
          // onDayBlur={()=>setOpen(false)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
