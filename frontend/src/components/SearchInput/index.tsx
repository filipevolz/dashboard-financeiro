import { MagnifyingGlass } from "phosphor-react";
import { SearchInputContainer, Input, SearchButton } from "./styles";

export function SearchInput() {
  return (
    <SearchInputContainer>
      <Input type="text" placeholder="Search here" />
      <SearchButton>
        <MagnifyingGlass size={20} />
      </SearchButton>
    </SearchInputContainer>
  );
}
