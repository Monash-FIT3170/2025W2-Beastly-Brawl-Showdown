import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import React from "react";
import socket from "../../socket";

export const AdventureSelectMode: React.FC = () => {
  const renderAdventureMonsterSelect = () => {
    socket.emit("adventure_level_selected", { level: 0 });
    FlowRouter.go("/adventure/monster-select");
  };

  return (
    <div>
      <div className="flex flex-row justify evenly">
        <div>
          <ButtonGeneric
            color="blue"
            size="battle"
            onClick={renderAdventureMonsterSelect}
          >
            SELECT
          </ButtonGeneric>
        </div>
        <div>
          <ButtonGeneric
            color="blue"
            size="battle"
            onClick={() => FlowRouter.go("/adventure/level-select")}
          >
            SELECT
          </ButtonGeneric>
        </div>
      </div>
    </div>
  );
};
