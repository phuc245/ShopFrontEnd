import { TrashIcon } from "@radix-ui/react-icons";
import { FaPencilAlt } from "react-icons/fa";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";

interface ActionProps {
  link_update?: string;
  setModalDelete: any;
  _id: string;
  name: string;
}

function Actions({ link_update, setModalDelete, _id, name }: ActionProps) {
  function handleDelete() {
    setModalDelete(true, { _id, name: name });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          ...
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {link_update && (
          <Link to={link_update}>
            <DropdownMenuItem>
              <FaPencilAlt className="mr-2 h-4 w-4" />
              <span>EDIT</span>
            </DropdownMenuItem>
          </Link>
        )}
        <DropdownMenuItem onClick={handleDelete}>
          <TrashIcon className="mr-2 h-4 w-4" />
          <span>DELETE</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Actions;
