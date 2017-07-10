export declare class HomewatchApi {
  auth: string;
  axios: any;
  homes:Homes;
  users: Users;
  hub: Hub;
  constructor(url: string, cache?: boolean);
  scenarioThings(scenario: { id: number }): ScenarioThings;
  scenarioApplier(scenario: { id: number }): ScenarioApplier;
  scenarios(home: { id: number }): Scenarios;
  status(thing: { id: number }): ThingStatus;
  things(home: { id: number }): Things;
}

declare class Homes {
  createHome(home: { name: string, tunnel: string, location: string }): Promise<any>;
  deleteHome(id: number): Promise<any>;
  getHome(id: number): Promise<any>;
  listHomes(): Promise<any>;
  updateHome(id: number, home: { name: string, tunnel: string, location: string }): Promise<any>;
  private constructor();
}

declare class Users {
  login(auth: { email: string, password: string }): Promise<any>;
  register(user: { name: string, email: string, password: string, password_confirmation: string }): Promise<any>;
  currentUser(): Promise<any>;
  updateCurrentUser(user: { name: string, email: string, password: string, password_confirmation: string }): Promise<any>;
  private constructor();
}

declare class Things {
  listThings(): Promise<any>;
  createThing(home: any): Promise<any>;
  updateThing(id: number, home: any): Promise<any>;
  deleteThing(id: number): Promise<any>;
  getThing(id: number): Promise<any>;
  private constructor();
}

declare class ThingStatus {
  getStatus(): Promise<any>;
  putStatus(status: Object): Promise<any>;
  private constructor();
}

declare class Scenarios {
  createScenario(scenario: { name: string }): Promise<any>;
  deleteScenario(id: number): Promise<any>;
  getScenario(id: number): Promise<any>;
  listScenarios(): Promise<any>;
  updateScenario(id: number, scenario: { name: string }): Promise<any>;
  private constructor();
}

declare class ScenarioThings {
  createScenarioThing(scenarioThing: { thing_id: number, status: any }): Promise<any>;
  deleteScenarioThing(id: number): Promise<any>;
  getScenarioThing(id: number): Promise<any>;
  listScenarioThings(): Promise<any>;
  updateScenarioThing(id: number, scenarioThing: { thing_id: number, status: any }): Promise<any>;
  private constructor();
}

declare class ScenarioApplier {
  applyScenario(): Promise<any>;
  private constructor();
}

declare class Hub {
  getTunnel(): Promise<any>;
  private constructor();
}
