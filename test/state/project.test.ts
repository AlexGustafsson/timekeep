import { expect } from "chai";

import Project, {ProjectEvent} from "../../src/state/project";

describe("project", () => {
  it("wraps data", () => {
    const project = new Project({_id: "id", _rev: "rev", name: "Name", group: "Group"});
    expect(project.id).equals("id");
    expect(project.name).equals("Name");
    expect(project.group).equals("Group");
  });

  it("emits changes", async () => {
    const project = new Project({ _id: "id", _rev: "rev", name: "Name", group: "Group" });
    const changes: ProjectEvent[] = [];
    project.on("change", data => {
      changes.push(data);
    });
    project.name = "NewName";
    project.group = "NewGroup";

    expect(changes.length).equals(2, "not all changes were emitted");

    expect(changes[0].property).equals("name");
    expect(changes[0].project.id).equals("id");
    expect(changes[0].oldValue).equals("Name");
    expect(changes[0].newValue).equals("NewName");

    expect(changes[1].property).equals("group");
    expect(changes[1].project.id).equals("id");
    expect(changes[1].oldValue).equals("Group");
    expect(changes[1].newValue).equals("NewGroup");
  });
});
