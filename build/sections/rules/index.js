import { jsxRule } from './jsx';
import { jadeRule } from './jade';
import { jsonRule } from './json';
import { lessRule, lessRuleExtract } from './less';
import { imageRule } from './image';
import { fontRules } from './font';

const rules = [
  jsxRule,
  jadeRule,
  fontRules,
  imageRule
];

if (process.env.NODE_ENV === 'static') {
  rules.push(jsonRule);
  rules.push(lessRule);
} else {
  rules.push(lessRuleExtract);
}

export default rules;
