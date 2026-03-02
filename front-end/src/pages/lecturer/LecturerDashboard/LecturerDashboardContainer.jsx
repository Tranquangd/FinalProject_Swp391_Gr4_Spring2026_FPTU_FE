import { useEffect, useState } from "react";
import { lecturerApi } from "../../../api/lecturerApi";
import  LecturerDashboard  from "./LecturerDashboardForm";

export default function LecturerDashboardContainer() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [students, setStudents] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [commitStats, setCommitStats] = useState([]);

  useEffect(() => {
    lecturerApi.getGroups()
      .then((res) => {
        setGroups(res.data);
        if (res.data.length > 0) {
          setSelectedGroup(res.data[0]);
        }
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (!selectedGroup) return;

    const groupId = selectedGroup.id;

    // Students
    lecturerApi.getStudents(groupId)
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));

    // Jira tasks
    lecturerApi.getJiraTasks(groupId)
      .then(res => setRequirements(res.data))
      .catch(err => console.error(err));

    // Member statistics 
    lecturerApi.getAllMemberStatistics(groupId)
      .then(res => setCommitStats(res.data))
      .catch(err => console.error(err));

    // Github stats 
    lecturerApi.getGithubStats(groupId)
      .then(res => console.log("Github stats:", res.data))
      .catch(err => console.error(err));

  }, [selectedGroup]);

  return (
    <LecturerDashboard
      lecturer={{ fullName: "Lecturer" }}
      groups={groups}
      selectedGroup={selectedGroup}
      onSelectGroup={setSelectedGroup}
      students={students}
      requirements={requirements}
      commitStats={commitStats}
    />
  );
}
