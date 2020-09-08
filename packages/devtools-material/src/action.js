/**
 *
 * create by grg on 2020/9/08
 *
 * @flow
 */
import fs from 'fs';
import { join } from 'path';
import type { ActionParams } from '@lugia/devtools-material';
import { getFolderNames, getDemoFolderNames } from './create';

function getActionFile(targetPath: string, folderName: string): string {
  return `${targetPath}/${folderName}/${folderName}.zh-CN.json`;
}

function loadAction(
  path: string,
  folderName: string,
  metaName: string
): Object {
  const fileContent = fs.readFileSync(
    join(getActionFile(path, folderName, metaName))
  );

  return JSON.parse(fileContent);
}

function getAllActions(targetPath: string, folderNames: string[]): Object[] {
  const actions = [];
  folderNames.forEach((folderName: string) => {
    const actionInfo = fs.readFileSync(
      join(getActionFile(targetPath, folderName))
    );
    actions.push(JSON.parse(actionInfo));
  });

  return actions;
}

export async function createActions(params: ActionParams): ?string {
  const { targetPath, invalid = [] } = params;
  let total = 0;
  try {
    const allFileNames = await getFolderNames(targetPath, invalid);
    const folderNames = await getDemoFolderNames(allFileNames, targetPath);
    const actionInfos = getAllActions(
      targetPath,
      folderNames,
      loadAction
    );
    total = actionInfos.length;
    console.log('共获取主题配置组件[%d]个', total);

    const outFilePath = join(targetPath, 'actionInfos.json');

    return fs.writeFileSync(
      outFilePath,
      JSON.stringify(actionInfos)
    );
  } catch (e) {
    console.log(e);
  } finally {
    console.log(`共生成 ${total} 个主题元信息`);
  }
}
