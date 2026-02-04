import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Button,
  Buttons,
  Callout,
  Card,
  CardHeader,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious as CarouselPreviousBase,
  CarouselNext as CarouselNextBase,
  CheckBoxGroup,
  CheckBoxItem,
  CodeBlock,
  DatePicker,
  FollowUpBlock,
  FollowUpItem,
  Image,
  Input,
  Label,
  ListBlock,
  ListItem,
  MarkDownRenderer,
  MessageLoading,
  RadioGroup,
  RadioItem,
  Select as SelectBase,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Separator,
  Slider,
  SwitchGroup,
  SwitchItem,
  Table as TableBase,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Tag,
  TagBlock,
  TextArea,
  TextCallout,
  TextContent,
  Steps as StepsBase,
  StepsItem,
  // Chart components
  BarChart,
  LineChart,
  AreaChart,
  PieChart,
} from '@crayonai/react-ui';

// Chevron icons for carousel navigation
const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

// Wrapper components that include icons by default
const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof CarouselPreviousBase>>((props, ref) => (
  <CarouselPreviousBase ref={ref} icon={<ChevronLeft />} {...props} />
));
CarouselPrevious.displayName = 'CarouselPrevious';

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof CarouselNextBase>>((props, ref) => (
  <CarouselNextBase ref={ref} icon={<ChevronRight />} {...props} />
));
CarouselNext.displayName = 'CarouselNext';

// Table wrapper that accepts columns and data props
interface TableColumn {
  key?: string;
  accessorKey?: string;  // Support both 'key' and 'accessorKey' formats
  header: string;
}

interface TableProps {
  columns: TableColumn[];
  data: Record<string, any>[];
}

const Table: React.FC<TableProps> = ({ columns, data }) => (
  <TableBase>
    <TableHeader>
      <TableRow key="header">
        {columns.map((col, colIndex) => {
          const columnKey = col.key || col.accessorKey || String(colIndex);
          return (
            <TableHead key={`header-${columnKey}`}>{col.header}</TableHead>
          );
        })}
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map((row, rowIndex) => (
        <TableRow key={`row-${rowIndex}`}>
          {columns.map((col, colIndex) => {
            const columnKey = col.key || col.accessorKey || String(colIndex);
            return (
              <TableCell key={`cell-${rowIndex}-${columnKey}`}>{row[columnKey]}</TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableBody>
  </TableBase>
);

// Select wrapper that accepts options prop
interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  placeholder?: string;
  options: SelectOption[];
  defaultValue?: string;
}

const Select: React.FC<SelectProps> = ({ placeholder, options, defaultValue }) => (
  <SelectBase defaultValue={defaultValue}>
    <SelectTrigger>
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      {options.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  </SelectBase>
);

// Steps wrapper that accepts steps array prop
interface StepData {
  title: string;
  description: string;
}

interface StepsProps {
  steps: StepData[];
}

const Steps: React.FC<StepsProps> = ({ steps }) => (
  <StepsBase>
    {steps.map((step, index) => (
      <StepsItem key={index} title={step.title} details={step.description} />
    ))}
  </StepsBase>
);

// Component registry mapping string names to actual React components
export const componentRegistry: Record<string, React.ComponentType<any>> = {
  // Layout
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Card,
  CardHeader,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,

  // Content
  TextContent,
  MarkDownRenderer,
  CodeBlock,
  Image,

  // Data Display
  Table,  // Uses wrapper that accepts columns/data
  ListBlock,
  ListItem,
  Steps,  // Uses wrapper that accepts steps array

  // Charts
  BarChart,
  LineChart,
  AreaChart,
  PieChart,

  // Feedback
  Callout,
  TextCallout,
  Tag,
  TagBlock,
  FollowUpBlock,
  FollowUpItem,
  MessageLoading,

  // Forms
  Button,
  Buttons,
  Input,
  TextArea,
  Select,  // Uses wrapper that accepts options array
  CheckBoxGroup,
  CheckBoxItem,
  RadioGroup,
  RadioItem,
  SwitchGroup,
  SwitchItem,
  Slider,
  DatePicker,
  Label,

  // Utility
  Separator,
};

export type ComponentName = keyof typeof componentRegistry;
