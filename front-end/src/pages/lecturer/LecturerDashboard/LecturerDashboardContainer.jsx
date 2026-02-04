import { useEffect, useState } from "react";
import { lecturerApi } from "@/api/lecturerApi";
import { LecturerDashboard } from ".";

export default function LecturerDashboardContainer() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [students, setStudents] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [progressReports, setProgressReports] = useState([]);
  const [commitStats, setCommitStats] = useState([]);

  useEffect(() => {
    lecturerApi.getGroups().then((res) => {
      setGroups(res.data);
      setSelectedGroup(res.data[0]);
    });
  }, []);

  useEffect(() => {
    if (!selectedGroup) return;

    lecturerApi.getStudents(selectedGroup.id).then(res => setStudents(res.data));
    lecturerApi.getJiraTasks(selectedGroup.id).then(res => setRequirements(res.data));
    lecturerApi.getProgressReports(selectedGroup.id).then(res => setProgressReports(res.data));
    lecturerApi.getGithubStats(selectedGroup.id).then(res => setCommitStats(res.data));
  }, [selectedGroup]);

  return (
    <LecturerDashboard
      lecturer={{ fullName: "Lecturer" }}
      groups={groups}
      selectedGroup={selectedGroup}
      onSelectGroup={setSelectedGroup}
      students={students}
      requirements={requirements}
      progressReports={progressReports}
      commitStats={commitStats}
    />
  );
}
