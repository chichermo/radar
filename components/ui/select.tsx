import * as React from "react"

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ value, onValueChange, children, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              value,
              onValueChange,
            } as any)
          }
          return child
        })}
      </div>
    )
  }
)
Select.displayName = "Select"

interface SelectTriggerProps {
  children: React.ReactNode;
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, value, onValueChange, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(value || '');

    const handleClick = () => {
      setIsOpen(!isOpen);
    };

    const handleSelect = (newValue: string) => {
      setSelectedValue(newValue);
      onValueChange?.(newValue);
      setIsOpen(false);
    };

    return (
      <div className="relative">
        <button
          className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`}
          ref={ref}
          onClick={handleClick}
          {...props}
        >
          {children}
        </button>
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child) && child.type === SelectContent) {
                return React.cloneElement(child, {
                  onSelect: handleSelect,
                  selectedValue,
                } as any)
              }
              return null
            })}
          </div>
        )}
      </div>
    )
  }
)
SelectTrigger.displayName = "SelectTrigger"

interface SelectContentProps {
  children: React.ReactNode;
  onSelect?: (value: string) => void;
  selectedValue?: string;
}

const SelectContent = ({ children, onSelect, selectedValue }: SelectContentProps) => {
  return (
    <div className="py-1">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === SelectItem) {
          return React.cloneElement(child, {
            onSelect,
            selectedValue,
          } as any)
        }
        return child
      })}
    </div>
  )
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  onSelect?: (value: string) => void;
  selectedValue?: string;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ value, children, className, onSelect, selectedValue, ...props }, ref) => {
    const isSelected = selectedValue === value;

    const handleClick = () => {
      onSelect?.(value);
    };

    return (
      <div
        className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${
          isSelected ? 'bg-gray-100' : ''
        } ${className || ''}`}
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        {children}
      </div>
    )
  }
)
SelectItem.displayName = "SelectItem"

interface SelectValueProps {
  placeholder?: string;
  value?: string;
}

const SelectValue = ({ placeholder, value }: SelectValueProps) => {
  return <span>{value || placeholder}</span>
}

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } 