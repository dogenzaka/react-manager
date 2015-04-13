
export default {

  'add an endpoint': 'エンドポイント追加',
  cancel: 'キャンセル',
  name: '名前',
  save: '保存',
  url: 'URL',

  tv4: {
    INVALID_TYPE: "正しい{type}の形式で入力してください",
    ENUM_MISMATCH: "{value}に含まれる値ではありません",
    ANY_OF_MISSING: "anyOfスキーマの全て該当しません",
    ONE_OF_MISSING: "oneOfスキーマのいずれにも該当しません",
    ONE_OF_MULTIPLE: "oneOfスキーマの複数に項目に該当します。{index1}, {index2}",
    NOT_PASSED: "データがnotスキーマに該当します",
    // Numeric errors
    NUMBER_MULTIPLE_OF: "{value}は、{multipleOf}に該当しません",
    NUMBER_MINIMUM: "{value}は{minimum}以下で設定してください",
    NUMBER_MINIMUM_EXCLUSIVE: "{value}は{minimum}未満で設定してください",
    NUMBER_MAXIMUM: "{value}は{maximum}以上で設定してください",
    NUMBER_MAXIMUM_EXCLUSIVE: "{value}は{maximum}より大きい値で設定してください",
    NUMBER_NOT_A_NUMBER: "{value}は数字ではありません",
    // String errors
    STRING_LENGTH_SHORT: "{minimum}文字以上で入力してください",
    STRING_LENGTH_LONG: "{maximum}文字以内で入力してください",
    STRING_PATTERN: "文字のパターンが適合しません {pattern}",
    // Object errors
    OBJECT_PROPERTIES_MINIMUM: "プロパティの数は{minimum}以上にしてください",
    OBJECT_PROPERTIES_MAXIMUM: "プロパティの数は{maximum}以内にしてください",
    OBJECT_REQUIRED: "この項目は必須です",
    OBJECT_ADDITIONAL_PROPERTIES: "追加プロパティは許可されていません",
    OBJECT_DEPENDENCY_KEY: "必須なプロパティがありません。{missing}",
    // Array errors
    ARRAY_LENGTH_SHORT: "アイテムの数は{minimum}個以上必要です",
    ARRAY_LENGTH_LONG: "アイテムの数は{maximum}個以内で設定してください",
    ARRAY_UNIQUE: "アイテムに重複があります。({match1}, {match2})",
    ARRAY_ADDITIONAL_ITEMS: "追加アイテムは許可されていません",
    // Format errors
    FORMAT_CUSTOM: "不正なフォーマットです ({message})",
    KEYWORD_CUSTOM: "不正なキーワードです {key} ({message})",
    // Schema structure
    CIRCULAR_REFERENCE: "循環参照があります $refs: {urls}",
    // Non-standard validation options
    UNKNOWN_PROPERTY: "不明なプロパティです",
  },
};
