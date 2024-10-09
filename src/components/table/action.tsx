import { TrashIcon } from "@radix-ui/react-icons";
import { FaPencilAlt } from "react-icons/fa";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

function Actions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          ...
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <FaPencilAlt className="mr-2 h-4 w-4" />
          <span>EDIT</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <TrashIcon className="mr-2 h-4 w-4" />
          <span>DELETE</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Actions;
