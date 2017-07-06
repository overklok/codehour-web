var blocksCount;

$(document).ready(function () {
    // onChangeBlocks(0);

    function onMove(event) {
        if (event.type == Blockly.Events.MOVE) {
            var oldBlocksCount = blocksCount;
            blocksCount = Object.keys(workspace.blockDB_).length;

            if (blocksCount != oldBlocksCount) {
                onChangeBlocks(blocksCount);
            }
        }
    }
    // workspace.addChangeListener(onMove);
    
    function onChangeBlocks(count) {
        if (count == 0) {
            $("#execute-btn").prop('disabled', true);
        } else {
            $("#execute-btn").prop('disabled', false);
        }

        blockLimitCheck(Blockly.Xml.workspaceToDom(workspace));
    }
});

var preCheck = function (xml) {
    //stub

    return true;
};

var blockLimitCheck = function (xml) {
    console.log(xml, $(xml));

    if (typeof LevelConfig.maxBlocksType !== "undefined") {

        for (block_type_name in LevelConfig.maxBlocksType) {

            if (LevelConfig.maxBlocksType.hasOwnProperty(block_type_name)) {

                var block_type_list = $(xml).find("block[type='" + block_type_name + "']");

                var block_type_count = block_type_list.length;

                var toolbox_src = $("#toolbox-wrap");

                if (block_type_count >= LevelConfig.maxBlocksType[block_type_name]) {
                    toolbox_src.find("block[type='" + block_type_name + "']").replaceWith(
                    "<block type='" + block_type_name + "' disabled='true'></block>");
                } else {
                    toolbox_src.find("block[type='" + block_type_name + "']").replaceWith(
                    "<block type='" + block_type_name + "'></block>");
                }

                console.log(toolbox_src.html());

                workspace.updateToolbox(toolbox_src.html());
            }
        }
    }
};