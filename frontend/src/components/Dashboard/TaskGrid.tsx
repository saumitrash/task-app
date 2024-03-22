import { Grid, GridItem } from "@chakra-ui/react";
import TaskCard from "./TaskCard";
import { TaskCardProps } from "../../types/task";

const TaskGrid = ({ tasks }: { tasks: TaskCardProps[] }) => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={10}>
      {tasks.map((task, index) => (
        <GridItem key={index}>
          <TaskCard
            _id={task._id}
            title={task.title}
            description={task.description}
            status={task.status}
          />
        </GridItem>
      ))}
    </Grid>
  );
};

export default TaskGrid;
