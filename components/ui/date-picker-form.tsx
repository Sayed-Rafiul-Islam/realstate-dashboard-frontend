"use client"

import * as React from "react"
import { format, getDate, parse } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerFormProps {
    onPickDate : (date : string) => void,
    label : string,
    initialDate : string
}

export const DatePickerForm  : React.FC<DatePickerFormProps> = ({
    onPickDate,
    label,
    initialDate
}) => {
    const [date, setDate] = React.useState<Date>()
    const [open, setOpen] = React.useState(false)

    React.useEffect(()=>{
        if (date) {
          // const localDate = date.toLocaleDateString()
          // const isoTime = date.toISOString().split("T")[1]

          // const year = localDate.split("/")[2]
          // const day = localDate.split("/")[1]
          // const month = localDate.split("/")[0]

          // const newDay = day.length === 1 ? '0'+day : day
          // const newMonth = month.length === 1 ? '0'+month : month

          // const newDate = year + '-' + newMonth + '-' + newDay + 'T' + isoTime

          onPickDate(date.toISOString())

        } else if(initialDate) {
          onPickDate(initialDate)
        }
        else {
          onPickDate('')
        }
      },[date])
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
          {date ? format(date, "PPP") : <span>{initialDate ? format(initialDate, "PPP") : label}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" onInteractOutside={()=>setOpen(false)}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          onDayClick={()=>setOpen(false)}
          // onDayBlur={()=>setOpen(false)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
