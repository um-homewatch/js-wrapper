export declare class HomewatchApi {
  auth: string;
  axios: any;
  homes: Homewatch.Homes;
  users: Homewatch.Users;
  hub: Homewatch.Hub;
  constructor(url: string, cache?: boolean);
  scenarioThings(scenario: { id: number }): Homewatch.ScenarioThings;
  scenarioApplier(scenario: { id: number }): Homewatch.ScenarioApplier;
  scenarios(home: { id: number }): Homewatch.Scenarios;
  status(thing: { id: number }): Homewatch.ThingStatus;
  things(home: { id: number }): Homewatch.Things;
  timedTasks(home: { id: number }): Homewatch.TimedTasks;
  triggeredTasks(home: { id: number }): Homewatch.TriggeredTasks;
}

declare namespace Homewatch {
  class Homes {
    createHome(home: { name: string, tunnel: string, location: string }): Promise<any>;
    deleteHome(id: number): Promise<any>;
    getHome(id: number): Promise<any>;
    listHomes(): Promise<any>;
    updateHome(id: number, home: { name: string, tunnel: string, location: string }): Promise<any>;
    private constructor();
  }

  class Users {
    login(auth: { email: string, password: string }): Promise<any>;
    register(user: { name: string, email: string, password: string, password_confirmation: string }): Promise<any>;
    currentUser(): Promise<any>;
    updateCurrentUser(user: { name: string, email: string, password: string, password_confirmation: string }): Promise<any>;
    private constructor();
  }

  class Things {
    listThings(): Promise<any>;
    createThing(home: any): Promise<any>;
    updateThing(id: number, home: any): Promise<any>;
    deleteThing(id: number): Promise<any>;
    getThing(id: number): Promise<any>;
    private constructor();
  }

  class ThingStatus {
    getStatus(): Promise<any>;
    putStatus(status: Object): Promise<any>;
    private constructor();
  }

  class Scenarios {
    createScenario(scenario: { name: string }): Promise<any>;
    deleteScenario(id: number): Promise<any>;
    getScenario(id: number): Promise<any>;
    listScenarios(): Promise<any>;
    updateScenario(id: number, scenario: { name: string }): Promise<any>;
    private constructor();
  }

  class ScenarioThings {
    createScenarioThing(scenarioThing: { thing_id: number, status: any }): Promise<any>;
    deleteScenarioThing(id: number): Promise<any>;
    getScenarioThing(id: number): Promise<any>;
    listScenarioThings(): Promise<any>;
    updateScenarioThing(id: number, scenarioThing: { thing_id: number, status: any }): Promise<any>;
    private constructor();
  }

  class ScenarioApplier {
    applyScenario(): Promise<any>;
    private constructor();
  }

  class TimedTasks {
    createTimedTask(timedTask: { thing_id?: number, scenario_id?: number, status: any, cron: string }): Promise<any>;
    deleteTimedTask(id: number): Promise<any>;
    getTimedTask(id: number): Promise<any>;
    listTimedTasks(): Promise<any>;
    updateTimedTask(id: number, timedTask: { thing_id?: number, scenario_id?: number, status: any, cron: string }): Promise<any>;
    private constructor();
  }

  class TriggeredTasks {
    createTriggeredTask(triggeredTask: { thing_id?: number, scenario_id?: number, thing_to_compare_id: number, comparator: string, status_to_compare: any, status_to_apply: any }): Promise<any>;
    deleteTriggeredTask(id: number): Promise<any>;
    getTriggeredTask(id: number): Promise<any>;
    listTriggeredTasks(): Promise<any>;
    updateTriggeredTask(id: number, triggeredTask: { thing_id?: number, scenario_id?: number, thing_to_compare_id: number, comparator: string, status_to_compare: any, status_to_apply: any }): Promise<any>;
    private constructor();
  }

  class Hub {
    getTunnel(): Promise<any>;
    private constructor();
  }
}

