// src/helpers/colorScheme.ts

export const getStatusColorScheme = (status: string): string => {
  switch (status) {
    case "To Do":
      return "yellow";
    case "In Progress":
      return "blue";
    case "Done":
      return "green";
    default:
      return "gray";
  }
};
