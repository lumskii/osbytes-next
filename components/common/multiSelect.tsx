import React, { useState } from "react";
import { X } from "lucide-react";
import { FieldValues } from "react-hook-form";
import { Input } from "../ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "../ui/select";
import { Button } from "../ui/button";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectInputProps<TFieldValues extends FieldValues> {
  field: {
    value: string[];
    onChange: (value: string[]) => void;
  };
  options: Option[];
}

export default function MultiSelectInput<TFieldValues extends FieldValues>({
  field,
  options,
}: MultiSelectInputProps<TFieldValues>) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(field.value || []);

  const handleSelect = (value: string) => {
    if (!selectedOptions.includes(value)) {
      const updatedOptions = [...selectedOptions, value];
      setSelectedOptions(updatedOptions);
      field.onChange(updatedOptions);
    }
  };

  const handleRemove = (value: string) => {
    const updatedOptions = selectedOptions.filter((option) => option !== value);
    setSelectedOptions(updatedOptions);
    field.onChange(updatedOptions);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        {selectedOptions.map((option) => (
          <div
            key={option}
            className="flex items-center bg-background rounded-full px-3 py-1 text-sm"
          >
            <span>{option}</span>
            <Button
              type="button"
              onClick={() => handleRemove(option)}
              className="ml-2"
              variant="ghost"
              size="sm"
            >
              <X size={14} />
            </Button>
          </div>
        ))}
      </div>
      <Select onValueChange={handleSelect}>
        <SelectTrigger>
          <Input placeholder="Select services" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
