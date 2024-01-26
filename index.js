const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const yaml = require('js-yaml');

try {
    const org = core.getInput('organization', { required: true });

    const token = core.getInput('token', { required: true });

    const configPath = core.getInput('configPath', { required: true });

    const yamlContent = fs.readFileSync(configPath, { encoding: 'utf-8' });

    const data = yaml.load(yamlContent);

    const teamLabelsByNames = new Map();

    for (const teamName in data) {
        if (data.hasOwnProperty(teamName)) {
          const tags = data[teamName];
          teamLabelsByNames[teamName] = tags;
        }
      }

    for (let [teamName, teamLabels] of teamLabelsByNames){
        console.log("team: " + team);
        for (var label in teamLabels){
            cconsole.log("label: " + label);
        }
    }

    const author = github.context.actor;

    const octokit = github.getOctokit(token);


    // const allTeams = await octokit.rest.teams.list({ org: org });

    // const allTeamSlugs = allTeams.data.map(x => x.slug);

    // allTeamSlugs.filter(element => teamLabelsByName.keys.includes(element));

    // const userTeams = allTeamSlugs.filter(async (teamSlug) => {
    //     const { data: teamMembers } = await octokit.teams.listMembersInOrg({
    //         org,
    //         team_slug: teamSlug,
    //     });

    //     return teamMembers.some((member) => member.userId === userId);
    // });


} catch (error) {
    core.setFailed(error.message);
}