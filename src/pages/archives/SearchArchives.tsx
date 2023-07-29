import axios from "axios";
import { useState } from "react";
import styles from "./SearchArchives.module.css";

interface SearchArchivesProps {
  onSearch: (e: any, searchTerm: string, searchOption: string) => void;
}

const SearchArchives: React.FC<SearchArchivesProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("body");

  return (
    <div className={styles.searchCommand}>
      <label>Search By: </label>
      <select
        name="archive-field"
        id="archive-field"
        onChange={(e) => setSearchOption(e.target.value)}
      >
        <option value="body">Body</option>
        <option value="author">Author</option>
        <option value="title">Title</option>
      </select>
      <form onSubmit={(e) => onSearch(e, searchTerm, searchOption)}>
        <input
          placeholder="Search Archives..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <button>Find</button>
      </form>
    </div>
  );
};
export default SearchArchives;
