import { useState } from "react";

import { Badge } from "@public/components/ui/badge";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@public/components/ui/accordion"
import { Card, CardContent,CardHeader } from "@public/components/ui/card"
import { Button } from "@public/components/ui/button"
import { Input } from "@public/components/ui/input"
import { Checkbox } from "@public/components/ui/checkbox"

import {
  Snowflake,
  Zap,
  Car,
  Bike,
  Dumbbell,
  Waves,
  PawPrint,
  Mountain,
} from "lucide-react"
import PlayaScondidaCard from "./per-item-detail";
import PlayaScondidaAbout from "./gyst-detailed-content";



export default function DetailedPage({ project }) {
  // const [activeImage, setActiveImage] = useState(0);

  return (
    <>
        {/* HEADER */}
         La Carta - Cartagena Culture & Tourism &rsaquo; Accommodations &rsaquo; Glamping/Nature &rsaquo; Playa Scondida
        <PlayaScondidaCard />
        <PlayaScondidaAbout />  
      </>
  );
}
